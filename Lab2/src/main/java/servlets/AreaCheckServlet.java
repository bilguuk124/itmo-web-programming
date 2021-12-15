package servlets;

import beans.EntriesBean;
import beans.Entry;

import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

@WebServlet(name = "AreaCheckServlet", urlPatterns = "/checker")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        long startTime = System.nanoTime();
        String xString = request.getParameter("xVal");
        String yString = request.getParameter("yVal").replace(',','.');
        String rString = request.getParameter("rVal");
        boolean isValuesValid = validateValues(xString, yString, rString);

        if (isValuesValid) {
            double xValue = Double.parseDouble(xString);
            double yValue = Double.parseDouble(yString);
            double rValue = Double.parseDouble(rString);
            boolean isHit = checkHit(xValue, yValue, rValue);

            OffsetDateTime currentTimeObject = OffsetDateTime.now(ZoneOffset.UTC);
            String currentTime;
            try {
                currentTimeObject = currentTimeObject.minusMinutes(Long.parseLong(request.getParameter("timezone")));
                currentTime = currentTimeObject.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
            } catch (Exception exception) {
                currentTime = "HH:mm:ss";
            }

            String executionTime = String.valueOf(System.nanoTime() - startTime);

            EntriesBean entries = (EntriesBean) request.getSession().getAttribute("entries");
            if (entries == null) entries = new EntriesBean();
            entries.getEntries().add(new Entry(xValue, yValue, rValue, currentTime, executionTime, isHit));
            request.getSession().setAttribute("entries", entries);
        }

        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }


    private boolean validateX(String xString){
        try{
            Double[] xRange = {-3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0, 5.0};
            double xValue = Double.parseDouble(xString);
            return Arrays.asList(xRange).contains(xValue);
        } catch(NumberFormatException e){
            return false;
        }
    }
    private boolean validateY(String yString){
        try{
            double yValue = Double.parseDouble(yString);
            return yValue >= -3 && yValue <=3;
        } catch (NumberFormatException e){
            return false;
        }
    }
    private boolean validateR(String rString){
        try{
            Double[] rRange = {1.0, 1.5, 2.0, 2.5, 3.0};
            double rValue = Double.parseDouble(rString);
            return Arrays.asList(rRange).contains(rValue);
        } catch(NumberFormatException e){
            return false;
        }
    }
    private boolean validateValues(String xString, String yString, String rString){
        return validateR(rString) && validateX(xString) && validateY(yString);
    }
    private boolean checkTriangle(double xValue, double yValue, double rValue){
        return xValue <= 0 && yValue <= 0 && yValue >= (-xValue - rValue/2);
    }
    private boolean checkRectangle(double xValue, double yValue, double rValue){
        return xValue >=0 && yValue <= 0 && xValue <= rValue && yValue <= rValue;
    }
    private boolean checkCircle (double xValue, double yValue, double rValue){
        return xValue >= 0 && yValue >= 0 && Math.sqrt(xValue*xValue + yValue*yValue) <= rValue/2;
    }
    private boolean checkHit(double xValue, double yValue, double rValue){
        return checkTriangle(xValue,yValue,rValue) || checkRectangle(xValue, yValue, rValue) || checkCircle(xValue, yValue, rValue);
    }
}

