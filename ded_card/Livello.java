package ded_card;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Scanner;

public class Livello {

    DBConnect dbConnect = new DBConnect();

    String classe;
    int lep=1, dV, pf, forza, destrezza, costituzione, intelligenza, saggezza, carisma;

    double bonusAttacBase, tempra, riflessi, volonta, abilita;

    public void add_caratteristiche(int forza, int destrezza, int costituzione, int intelligenza, int saggezza, int carisma){

    }
    public void add_class_primo(String classe) throws SQLException {
        String sql = "SELECT * FROM classes WHERE cl_name LIKE '%"+classe+"%';";
        Statement statement = dbConnect.getCon().createStatement();
        ResultSet resultSet = statement.executeQuery(sql);

        while(resultSet.next()){
            lep++;
            if (resultSet.getString("cl_bab").equals("a")){
                bonusAttacBase = 1;
            } else if(resultSet.getString("cl_bab").equals("m")){
                bonusAttacBase = 0.75;
            } else if (resultSet.getString("cl_bab").equals("b")){
                bonusAttacBase = 0;
            }
            if (resultSet.getString("cl_T").equals("a")){
                tempra = 2.5;
            } else if(resultSet.getString("cl_T").equals("b")){
                tempra = 0;
            }
            if (resultSet.getString("cl_R").equals("a")){
                riflessi = 2.5;
            } else if(resultSet.getString("cl_R").equals("b")){
                riflessi = 0;
            }
            if (resultSet.getString("cl_V").equals("a")){
                volonta = 2.5;
            } else if(resultSet.getString("cl_V").equals("b")){
                volonta = 0;
            }
            if (lep>1){
                abilita += resultSet.getInt("cl_ab");
            } else {
                abilita = 4*resultSet.getInt("cl_ab");
            }
            dV++;
            if (lep>1) {
                if (lep % 2 == 0) {
                    pf = resultSet.getInt("cl_DV") / 2;
                } else {
                    pf = (resultSet.getInt("cl_DV") / 2) + 1;
                }
            } else {
                pf = resultSet.getInt("cl_DV");
            }
        }
    }

    public void add_class_secondo(String classe) throws SQLException {

        String sql = "SELECT * FROM classes WHERE cl_name LIKE '%" + classe + "%';";
        Statement statement = dbConnect.getCon().createStatement();
        ResultSet resultSet = statement.executeQuery(sql);

        while (resultSet.next()) {
            if (resultSet.getString("cl_bab").equals("a")) {
                bonusAttacBase++;
            } else if (resultSet.getString("cl_bab").equals("m")) {
                bonusAttacBase += 0.75;
            } else if (resultSet.getString("cl_bab").equals("b")) {
                bonusAttacBase += 0.5;
            }

            tempra +=0.5;
            riflessi +=0.5;
            volonta +=0.5;

            if (lep % 2 == 0) {
                pf = resultSet.getInt("cl_DV") / 2;
            } else {
                pf = (resultSet.getInt("cl_DV") / 2) + 1;
            }

            abilita += resultSet.getInt("cl_ab");

            if (lep % 2 == 0) {
                pf = resultSet.getInt("cl_DV") / 2;
            } else {
                pf = (resultSet.getInt("cl_DV") / 2) + 1;
            }
        }
    }

    public void pokaz() throws SQLException {
        String sql = "SELECT * FROM kontakty";
        Statement statement = dbConnect.getCon().createStatement();
        ResultSet resultSet = statement.executeQuery(sql);

        while(resultSet.next()){
            System.out.println("ID: "+resultSet.getInt("ID")+
                    " Imie: "+resultSet.getString("imie")+
                    " Nazwisko: "+resultSet.getString("nazwisko")+
                    " Telefon: "+resultSet.getString("telefon"));
        }
    }

    public void usun(int id) throws SQLException {
        String sql = "DELETE FROM kontakty WHERE ID = ?";
        PreparedStatement preparedStatement = dbConnect.getCon().prepareStatement(sql);
        preparedStatement.setInt(1,id);
        preparedStatement.execute();
        preparedStatement.close();

        System.out.println("Czy zatwierdzasz wprowadzenie nowych danych T/N ?");
        Scanner scanner = new Scanner(System.in);
        String dec = scanner.nextLine();
        if(dec.equals("T")){
            dbConnect.getCon().commit();
            System.out.println("Dane zostały utrwalone w bazie");
        }
        else{
            dbConnect.getCon().rollback();
            System.out.println("Dane zostały wycofane z bazy");
        }
    }

    public void zmien(int id, String imie, String nazwisko, String telefon) throws SQLException {
        String sql = "UPDATE kontakty SET imie=?,nazwisko=?,telefon=? WHERE ID = ?";
        PreparedStatement preparedStatement = dbConnect.getCon().prepareStatement(sql);
        preparedStatement.setInt(4,id);
        preparedStatement.setString(1,imie);
        preparedStatement.setString(2,nazwisko);
        preparedStatement.setString(3,telefon);
        preparedStatement.execute();
        preparedStatement.close();

        System.out.println("Czy zatwierdzasz wprowadzenie nowych danych T/N ?");
        Scanner scanner = new Scanner(System.in);
        String dec = scanner.nextLine();
        if(dec.equals("T")){
            dbConnect.getCon().commit();
            System.out.println("Dane zostały utrwalone w bazie");
        }
        else{
            dbConnect.getCon().rollback();
            System.out.println("Dane zostały wycofane z bazy");
        }
    }

    public void szukaj_frazy (String fraza) throws SQLException {
        String sql = "SELECT * FROM kontakty WHERE imie LIKE '%"+fraza+"%' OR nazwisko LIKE '%"+fraza+"%'";
        Statement statement = dbConnect.getCon().createStatement();
        ResultSet resultSet = statement.executeQuery(sql);

        while(resultSet.next()) {
            System.out.println("ID: " + resultSet.getInt("ID") +
                    " Imie: " + resultSet.getString("imie") +
                    " Nazwisko: " + resultSet.getString("nazwisko") +
                    " Telefon: " + resultSet.getString("telefon"));
        }
    }

}
