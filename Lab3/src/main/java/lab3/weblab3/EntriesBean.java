package lab3.weblab3;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.persistence.*;
import javax.security.auth.login.Configuration;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


public class EntriesBean implements Serializable  {
    private static final String persistenceUnit = "web-lab3";

    private Entry entry;
    private List<Entry> entries;

    private EntityManagerFactory entityManagerFactory;
    private EntityManager entityManager;
    private EntityTransaction transaction;

    public EntriesBean (){
        entry = new Entry();
        entries = new ArrayList<>();

        connection();
        loadEntries();
    }

    private void connection(){
        entityManagerFactory = Persistence.createEntityManagerFactory(persistenceUnit);
        entityManager = entityManagerFactory.createEntityManager();
        transaction = entityManager.getTransaction();
    }

    private void loadEntries(){
        try{
            transaction.begin();
            Query query = entityManager.createQuery("SELECT e FROM Entry e");
            entries = query.getResultList();
            transaction.commit();
        }catch (RuntimeException e){
            if(transaction.isActive()){
                transaction.rollback();
            }
            throw e;
        }
    }

    public String addEntry(){
        try{
            transaction.begin();
            entry.checkHit();
            entityManager.persist(entry);
            entries.add(entry);
            entry = new Entry();
            transaction.commit();
        }catch (RuntimeException e){
            if(transaction.isActive()){
                transaction.rollback();
            } throw e;
        }
        return "redirect";
    }

    public String clearEntries(){
        try{
            transaction.begin();
            Query query = entityManager.createQuery("DELETE FROM Entry ");
            query.executeUpdate();
            entries.clear();
            transaction.commit();
        }catch (RuntimeException e ){
            if(transaction.isActive()) transaction.rollback();
            throw e;
        }
        return "redirect";
    }

    public Entry getEntry(){
        return entry;
    }
    public void setEntry(Entry entry){
        this.entry = entry;
    }
    public List<Entry> getEntries(){
        return entries;
    }
    public void setEntries (List<Entry> entries){
        this.entries = entries;
    }
}