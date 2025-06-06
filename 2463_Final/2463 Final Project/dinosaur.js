
class Dinosaur {
 
  constructor() {
    this.x = 100; 
    this.height = 50; 
    this.offsetFromGround = 20; 
    this.y = height - this.height - this.offsetFromGround; 
    this.vy = 0;               
    this.gravity = 0.6;        
    this.jumpStrength = 15;     
    this.currentAnimation = "running";
    this.animations = {};      
    this.hurtDuration = 30;     
    this.hurtTimer = 0;         

    // Animations
    this.addAnimation("running", new SpriteAnimation(dinosaurRunning, 0, 0, 6));
    this.addAnimation("jumping", new SpriteAnimation(dinosaurJumping, 0, 0, 1, true));
    this.addAnimation("hurt", new SpriteAnimation(dinosaurHurt, 1, 0, 1, true)); 
  }


  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

 // Dinosaur jumps if on the ground and plays sound
  jump() {
    if (this.y === height - this.height - this.offsetFromGround) { 
      this.vy = -this.jumpStrength;
      this.currentAnimation = "jumping";

      if (jumpSound) {
        jumpSound.play();
      }
    }
  }


   // Updates the dinosaur's position and animation state
   // Handles gravity, ground collision, and animation transitions
   
  move() {
 
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - this.height - this.offsetFromGround);

    if (this.hurtTimer > 0) {
      this.hurtTimer--;
      if (this.hurtTimer === 0) {
        this.currentAnimation = "running"; 
      }
    } else if (this.y === height - this.height - this.offsetFromGround) {
      this.currentAnimation = "running";
    }
  }

 // Draws dinosaur and handles hurt animation
  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      // Flash effect during hurt animation
      if (this.hurtTimer > 0 && frameCount % 12 < 6) {
        return;
      }
      animation.draw(this.x, this.y);
    }
  }

 // Checks for collision with obstacles
  hits(obs) {
    return collideRectRect(this.x, this.y, 50, this.height, obs.x, obs.y, obs.width, obs.height);
  }
}