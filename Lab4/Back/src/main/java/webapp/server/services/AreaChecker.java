package webapp.server.services;


import javax.ejb.Singleton;

@Singleton
public class AreaChecker {

    private boolean checkTriangle(double x, double y, double r){
        return x >= 0 && y <= 0 && y >= (x - r / 2);
    }
    private boolean checkRectangle(double x, double y, double r){
        return x <= 0 && y <= 0 && x >= -r && y >= -r;
    }
    private boolean checkCircle(double x, double y, double r){
        return x <=0 && y >=0 && x*x + y*y <= r*r;
    }

    public boolean check(double x, double y, double r) {
        return checkCircle(x,y,r) || checkRectangle(x,y,r) || checkTriangle(x,y,r);
    }
}