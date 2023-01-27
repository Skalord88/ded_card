package ded_card;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Scanner;

public class Run {
    public static void main(String[] args) throws SQLException {
        Scanner scanner = new Scanner(System.in);
        Livello livello = new Livello();

        while (true) {
//            int caratteristiche[] = {15, 14, 13, 12, 10, 8};
            ArrayList<Integer> caratteristiche = new ArrayList<>();
            caratteristiche.add(15);
            caratteristiche.add(14);
            caratteristiche.add(13);
            caratteristiche.add(12);
            caratteristiche.add(10);
            caratteristiche.add(8);
            boolean car_chek = false;
            ArrayList<Integer> car_scelte = new ArrayList<>();
            int caratteristica;
            int forza = 0,destrezza = 0,costituzione = 0,intelligenza = 0,saggezza = 0,carisma = 0;

            while (true) {
                System.out.print("Scegli tra ");
                for (int x : caratteristiche){
                    System.out.print(x+" ");
                }
                System.out.println("");
                System.out.println("Quanta forza");
                caratteristica = scanner.nextInt();
                scanner.nextLine();
                if (car_chek!=true){
                    for (int x : caratteristiche) {
                        if (caratteristica == x) {
                            forza = caratteristica;
                            car_scelte.add(caratteristica);
                            car_chek = true;
                        }
                    }
                } else {
                    break;
                }
                    System.out.println("valore non consentito");
            }

            while (true) {
                System.out.println("Quanta destrezza");
                caratteristica = scanner.nextInt();
                scanner.nextLine();
                for (int x : car_scelte) {
                    if (x == caratteristica) {
                        System.out.println(x + " e' gia' stata selezionata");
                    } else {
                        break;
                    }
                    for (int y : caratteristiche){
                        if (y != caratteristica) {
                            System.out.println("puoi scegliere tra 15,14,13,12,10,8");
                        } else {
                            destrezza = caratteristica;
                            car_scelte.add(caratteristica);
                        }
                    }
                } break;
            }

            while (true) {
                System.out.println("Quanta costituzione");
                caratteristica = scanner.nextInt();
                scanner.nextLine();
                for (int x : car_scelte) {
                    if (x == caratteristica) {
                        System.out.println(x + "e' gia' stata selezionata");
                    } else {
                        break;
                    }
                }
                for (int x : caratteristiche) {
                    if (x != caratteristica) {
                        System.out.println("puoi scegliere tra 15,14,13,12,10,8");
                    } else {
                        costituzione = caratteristica;
                        car_scelte.add(caratteristica);
                    }
                } break;
            }

            while (true) {
                System.out.println("Quanta costituzione");
                caratteristica = scanner.nextInt();
                scanner.nextLine();
                for (int x : car_scelte) {
                    if (x == caratteristica) {
                        System.out.println(x + "e' gia' stata selezionata");
                    } else {
                        break;
                    }
                }
                for (int x : caratteristiche) {
                    if (x != caratteristica) {
                        System.out.println("puoi scegliere tra 15,14,13,12,10,8");
                    } else {
                        intelligenza = caratteristica;
                        car_scelte.add(caratteristica);
                    }
                } break;
            }

            while (true) {
                System.out.println("Quanta costituzione");
                caratteristica = scanner.nextInt();
                scanner.nextLine();
                for (int x : car_scelte) {
                    if (x == caratteristica) {
                        System.out.println(x + "e' gia' stata selezionata");
                    } else {
                        break;
                    }
                }
                for (int x : caratteristiche) {
                    if (x != caratteristica) {
                        System.out.println("puoi scegliere tra 15,14,13,12,10,8");
                    } else {
                        saggezza = caratteristica;
                        car_scelte.add(caratteristica);
                    }
                } break;
            }

            while (true) {
                System.out.println("Quanta costituzione");
                caratteristica = scanner.nextInt();
                scanner.nextLine();
                for (int x : car_scelte) {
                    if (x == caratteristica) {
                        System.out.println(x + "e' gia' stata selezionata");
                    } else {
                        break;
                    }
                }
                for (int x : caratteristiche) {
                    if (x != caratteristica) {
                        System.out.println("puoi scegliere tra 15,14,13,12,10,8");
                    } else {
                        carisma = caratteristica;
                        car_scelte.add(caratteristica);
                    }
                } break;
            }
            livello.add_caratteristiche(forza, destrezza, costituzione, intelligenza, saggezza, carisma);
            System.out.println("FOR: "+forza);
            System.out.println("DES: "+destrezza);
            System.out.println("COS: "+costituzione);
            System.out.println("INT: "+intelligenza);
            System.out.println("SAG: "+saggezza);
            System.out.println("CAR: "+carisma);

            System.out.println("Scegli una classe:");
            String classe = scanner.nextLine();
            livello.add_class_primo(classe);
            System.out.println(livello.lep);
            System.out.println(livello.pf);
            System.out.println(livello.bab);
            System.out.println(livello.tempra);
            System.out.println(livello.riflessi);
            System.out.println(livello.volonta);
            System.out.println(livello.abilita);
            break;
        }
    }
}
