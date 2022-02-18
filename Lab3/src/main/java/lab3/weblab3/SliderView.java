package lab3.weblab3;

import javax.faces.bean.RequestScoped;


@RequestScoped
public class SliderView {
    private double xValue;
    private double yValue;
    private double rValue;
    private String hitResult;


    public double getxValue(){
        return xValue;
    }
    public void setxValue(double xValue){
        this.xValue = xValue;
    }
    public double getrValue(){
        return rValue;
    }
    public void setrValue(double rValue){
        this.rValue = rValue;
    }
    public double getyValue(){return yValue;}
    public void setyValue(double yValue){this.yValue = yValue;}
    private boolean checkTriangle(){
        return xValue >= 0 && yValue <=0 && yValue >= (xValue -  rValue);
    }
    private boolean checkRectangle(){
        return xValue >= 0 && yValue >= 0 && yValue <= rValue && xValue <= rValue/2;
    }
    private boolean checkCircle(){
        return xValue <= 0 && yValue >= 0 && ((xValue*xValue) + (yValue*yValue) <= rValue*rValue);
    }
    public void checkHit(){
        hitResult = checkCircle() || checkTriangle() || checkRectangle() ? "Попадание" : "Промах";
    }



}
