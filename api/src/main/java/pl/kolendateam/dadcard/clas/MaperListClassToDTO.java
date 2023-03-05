package pl.kolendateam.dadcard.clas;

public class MaperListClassToDTO {
    public static ArrayList<RaceClassTypeDTO> toClassTypeBaseDTO(List<Class> classes){

        ArrayList<ClassTypeBaseDTO> classesDTO = new ArrayList();

        for (Class class : classes) {
            boolean skipCreateClassTypeDTO = false;

            for (ClassTypeBaseDTO classDTO : classesDTO) {
                if (classDTO.className.equals(class.getClassName)) { 
                    SubRaceBaseDTO tempSubRace = new SubRaceBaseDTO(race);
                    raceDTO.subRaces.add(tempSubRace);
                    skipCreateRaceDTO = true;
                }
            }

            if(!skipCreateClassTypeDTO){
                RaceBaseDTO tempRace = new RaceBaseDTO(race);
                racesDTO.add(tempRace);
            }
        }

        return racesDTO;
    }
    
}
