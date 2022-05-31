export class Point {
  x: number;
  y: number;
  r: number;
  hit:boolean;
  owner: string = 'Ali';

  setX(x){
    this.x = x;
  }

  setY(y){
    this.y = y;
  }

  setR(r){
    this.r = r;
  }
  getR(){
    return this.r;
  }
}
