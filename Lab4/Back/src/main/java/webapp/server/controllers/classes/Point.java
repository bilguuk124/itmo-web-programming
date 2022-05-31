package webapp.server.controllers.classes;

import java.util.Date;

public class Point {

    private double x;
    private double y;
    private double r;
    private boolean hit;
    private String owner;

    public double getX(){
        return x;
    }

    public void setX(double x){
        this.x=x;
    }
    public double getY(){
        return y;
    }
    public void setY(double y){
        this.y = y;
    }
    public void setR(double r){
        this.r = r;
    }

    public double getR() {
        return r;
    }

    public boolean isHit(){
        return hit;
    }
    public void setHit(boolean hit){
        this.hit = hit;
    }
    public String getOwner(){
        return owner;
    }
    public void setOwner(String owner){
        this.owner = owner;
    }
}
