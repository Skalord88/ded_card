import { SpecialAttacks } from "../interfaces";

export type SpecialAttacksList = {
  title: string;
  value: number;
};

export const sepcialAttacksToList = (prer: SpecialAttacks[]): SpecialAttacksList[] => {

  const specialAttacksList: SpecialAttacksList[] = [
        { title: "bullRush", value: prer.reduce((tot, att) => tot + att.bullRush,0) },
        { title: "charge", value: prer.reduce((tot, att) => tot + att.charge,0) },
        { title: "disarm", value: prer.reduce((tot, att) => tot + att.disarm,0) },
        { title: "grapple", value: prer.reduce((tot, att) => tot + att.grapple,0) },
        { title: "sunder", value: prer.reduce((tot, att) => tot + att.sunder,0) },
        { title: "vsBullRush", value: prer.reduce((tot, att) => tot + att.vsBullRush,0) },
        { title: "vsCharge", value: prer.reduce((tot, att) => tot + att.vsCharge,0) },
        { title: "vsDisarm", value: prer.reduce((tot, att) => tot + att.vsDisarm,0) },
        { title: "vsGrapple", value: prer.reduce((tot, att) => tot + att.vsGrapple,0) },
        { title: "vsOverrun", value: prer.reduce((tot, att) => tot + att.vsOverrun,0) },
        { title: "vsSunder", value: prer.reduce((tot, att) => tot + att.vsSunder,0) }
    ];

    return specialAttacksList.filter(att => att.title === "grapple" || att.value !== 0);
}