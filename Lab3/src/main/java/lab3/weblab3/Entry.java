package lab3.weblab3;

import org.primefaces.event.SlideEndEvent;

import javax.persistence.*;
import java.beans.EventHandler;
import java.io.Serializable;
import java.util.EventListener;

@Entity
public class Entry implements Serializable {
    @Id
    @SequenceGenerator(name = "jpaSequence", sequenceName = "JPA_SEQUENCE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jpaSequence")
    private int id;

    private Double xValue;
    private Double yValue;
    private Double rValue;
    private String hitResult;

    public Entry(){
    }
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
    public int getId(){
        return id;
    }
    public void setId(int id){
        this.id = id;
    }
    public Double getxValue(){
        return xValue;
    }
    public void setxValue(Double xValue){
        this.xValue = xValue;
    }
    public Double getyValue(){
        return yValue;
    }

    public void setyValue(Double yValue){
        this.yValue = yValue;
    }
    public Double getrValue(){
        return rValue;
    }
    public void setrValue(Double rValue){
        this.rValue = rValue;
    }
    public String getHitResult(){
        return hitResult;
    }
    public void setHitResult(String hitResult){
        this.hitResult = hitResult;
    }
    public void onSlideEndX(SlideEndEvent event){
        this.xValue = Double.parseDouble(String.valueOf(event.getValue())) ;
    }
    public void onSlideEndR(SlideEndEvent event){
        this.rValue = Double.parseDouble(String.valueOf(event.getValue()));
    }

    @Override
    public String toString(){
        return "Entry{" +
                "xValue = "+ xValue +
                ", yValue = " + yValue +
                ", rValue = " + rValue +
                ", hitResult = " + hitResult +
                '}';
    }
    @Override
    public int hashCode(){
        return xValue.hashCode() + yValue.hashCode() + rValue.hashCode();
    }
    @Override
    public boolean equals(Object obj){
        if(this == obj) return true;
        if(obj instanceof Entry){
            Entry entryObj = (Entry) obj;
            return xValue.equals(entryObj.getxValue()) &&
                    yValue.equals(entryObj.getyValue()) &&
                    rValue.equals(entryObj.getrValue());
        }
        return false;
    }


}
