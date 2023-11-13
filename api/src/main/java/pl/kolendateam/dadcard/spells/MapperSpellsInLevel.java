package pl.kolendateam.dadcard.spells;

import java.lang.reflect.Type;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import pl.kolendateam.dadcard.spells.entity.SpellLevel;
import pl.kolendateam.dadcard.spells.entity.SpellsInLevel;

public class MapperSpellsInLevel {

    public static ArrayList<SpellsInLevel>toSpellsInLevel(String spellsInLevel) {

        Gson gson = new Gson();
        Type jsonListSpells = new TypeToken<ArrayList<SpellsInLevel>>(){}.getType();
        ArrayList<SpellsInLevel> ListSpells = gson.fromJson(spellsInLevel, jsonListSpells);

        return ListSpells;
    }

    public static SpellLevel[] toSpellLevelArray(String enumSpell) {

        Gson gson = new Gson();
        Type enumSpellArrayJson = new TypeToken<SpellLevel[]>() {}.getType();
        SpellLevel[] levelSpellArray = gson.fromJson(enumSpell, enumSpellArrayJson);

        return levelSpellArray;
    }

}
