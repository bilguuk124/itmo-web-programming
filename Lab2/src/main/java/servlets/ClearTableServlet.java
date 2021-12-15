package servlets;

import beans.EntriesBean;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
@WebServlet(name = "ClearTableServlet", urlPatterns = "/clear")
public class ClearTableServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        EntriesBean entries = (EntriesBean) request.getSession().getAttribute("entries");
        if( entries == null) entries = new EntriesBean();
        entries.getEntries().clear();
        request.getSession().setAttribute("entries", entries);

        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }
}