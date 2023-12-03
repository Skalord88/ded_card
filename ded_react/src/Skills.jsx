import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export function Show() {

    let { charId } = useParams();
    const URL = 'http://localhost:8080/character-card/'+charId;

    const [char, setChar] = useState("");
    const [abilitys, setAbilitys] = useState("");
    const [skills, setSkills] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resURL = await axios.get(URL);
                setChar(resURL.data);
                setSkills(resURL.data.skillsList);

            } catch(error) {
                console.log(error)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const grapple = char.bab + (Math.floor((abilitys.streght-10)/2));

    return ()