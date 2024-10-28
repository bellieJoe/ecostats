
import { biodiversity_10_col_defs } from "../../components/Reports/Forms/Biodiversity/Biodiversity_Table_10";
import { biodiversity_11_col_defs } from "../../components/Reports/Forms/Biodiversity/Biodiversity_Table_11";
import { biodiversity_12_col_defs } from "../../components/Reports/Forms/Biodiversity/Biodiversity_Table_12";
import { biodiversity_15_col_defs } from "../../components/Reports/Forms/Biodiversity/Biodiversity_Table_15";
import { biodiversity_16_col_defs } from "../../components/Reports/Forms/Biodiversity/Biodiversity_Table_16";
import { biodiversity_17_col_defs } from "../../components/Reports/Forms/Biodiversity/Biodiversity_Table_17";
import { biodiversity_19_col_defs } from "../../components/Reports/Forms/Biodiversity/Biodiversity_Table_19";
import { biodiversity_2_col_defs } from "../../components/Reports/Forms/Biodiversity/Biodiversity_Table_2";
import { biodiversity_3_col_defs } from "../../components/Reports/Forms/Biodiversity/Biodiversity_Table_3";
import { biodiversity_4_col_defs } from "../../components/Reports/Forms/Biodiversity/Biodiversity_Table_4";
import { biodiversity_5_col_defs } from "../../components/Reports/Forms/Biodiversity/Biodiversity_Table_5";
import { biodiversity_6_col_defs } from "../../components/Reports/Forms/Biodiversity/Biodiversity_Table_6";
import { biodiversity_7_col_defs } from "../../components/Reports/Forms/Biodiversity/Biodiversity_Table_7";
import { biodiversity_8_col_defs } from "../../components/Reports/Forms/Biodiversity/Biodiversity_Table_8";
import { biodiversity_9_col_defs } from "../../components/Reports/Forms/Biodiversity/Biodiversity_Table_9";
import { forestry_1_col_defs } from "../../components/Reports/Forms/Forestry/Forestry_Table_1";
import { forestry_2_col_defs } from "../../components/Reports/Forms/Forestry/Forestry_Table_2";
import { forestry_24_col_defs } from "../../components/Reports/Forms/Forestry/Forestry_Table_24";
import { forestry_3_col_defs } from "../../components/Reports/Forms/Forestry/Forestry_Table_3";
import { forestry_4_col_defs } from "../../components/Reports/Forms/Forestry/Forestry_Table_4";
import { forestry_5_col_defs } from "../../components/Reports/Forms/Forestry/Forestry_Table_5";
import { land_1_col_defs } from "../../components/Reports/Forms/Land/Land_Table_1";
import { land_2_col_defs } from "../../components/Reports/Forms/Land/Land_Table_2";
import { land_3_col_defs } from "../../components/Reports/Forms/Land/Land_Table_3";
import { land_4_col_defs } from "../../components/Reports/Forms/Land/Land_Table_4";
import { land_5_col_defs } from "../../components/Reports/Forms/Land/Land_Table_5";
import { land_6_col_defs } from "../../components/Reports/Forms/Land/Land_Table_6";
import { land_7_col_defs } from "../../components/Reports/Forms/Land/Land_Table_7";

export enum FormEnum {
    LAND_1 = "land_1",
    LAND_2 = "land_2",
    LAND_3 = "land_3",
    LAND_4 = "land_4",
    LAND_5 = "land_5",
    LAND_6 = "land_6",
    LAND_7 = "land_7",

    FORESTRY_1="forestry_1",
    FORESTRY_2="forestry_2",
    FORESTRY_3="forestry_3",
    FORESTRY_4="forestry_4",
    FORESTRY_5="forestry_5",
    FORESTRY_6="forestry_6",
    FORESTRY_7="forestry_7",
    FORESTRY_8="forestry_8",
    FORESTRY_24="forestry_24",

    BIODIVERSITY_2="biodiversity_2",
    BIODIVERSITY_3="biodiversity_3",
    BIODIVERSITY_4="biodiversity_4",
    BIODIVERSITY_5="biodiversity_5",
    BIODIVERSITY_6="biodiversity_6",
    BIODIVERSITY_7="biodiversity_7",
    BIODIVERSITY_8="biodiversity_8",
    BIODIVERSITY_9="biodiversity_9",
    BIODIVERSITY_10="biodiversity_10",
    BIODIVERSITY_11="biodiversity_11",
    BIODIVERSITY_12="biodiversity_12",
    BIODIVERSITY_13="biodiversity_13",
    BIODIVERSITY_14="biodiversity_14",
    BIODIVERSITY_15="biodiversity_15",
    BIODIVERSITY_16="biodiversity_16",
    BIODIVERSITY_17="biodiversity_17",
    BIODIVERSITY_18="biodiversity_18",
    BIODIVERSITY_19="biodiversity_19",
    BIODIVERSITY_20="biodiversity_20",
}

export enum Sector {
    LAND = "land",
    BIODIVERSITY = "biodiversity",
    FORESTRY = "forestry",
}

export const ColDefsMap = {
    [FormEnum.LAND_1] : land_1_col_defs,
    [FormEnum.LAND_2] : land_2_col_defs,
    [FormEnum.LAND_3] : land_3_col_defs,
    [FormEnum.LAND_4] : land_4_col_defs,
    [FormEnum.LAND_5] : land_5_col_defs,
    [FormEnum.LAND_6] : land_6_col_defs,
    [FormEnum.LAND_7] : land_7_col_defs,

    [FormEnum.FORESTRY_1] : forestry_1_col_defs,
    [FormEnum.FORESTRY_2] : forestry_2_col_defs,
    [FormEnum.FORESTRY_3] : forestry_3_col_defs,
    [FormEnum.FORESTRY_4] : forestry_4_col_defs,
    [FormEnum.FORESTRY_5] : forestry_5_col_defs,
    [FormEnum.FORESTRY_24] : forestry_24_col_defs,

    [FormEnum.BIODIVERSITY_2] : biodiversity_2_col_defs,
    [FormEnum.BIODIVERSITY_3] : biodiversity_3_col_defs,
    [FormEnum.BIODIVERSITY_4] : biodiversity_4_col_defs,
    [FormEnum.BIODIVERSITY_5] : biodiversity_5_col_defs,
    [FormEnum.BIODIVERSITY_6] : biodiversity_6_col_defs,
    [FormEnum.BIODIVERSITY_7] : biodiversity_7_col_defs,
    [FormEnum.BIODIVERSITY_8] : biodiversity_8_col_defs,
    [FormEnum.BIODIVERSITY_9] : biodiversity_9_col_defs,
    [FormEnum.BIODIVERSITY_10] : biodiversity_10_col_defs,
    [FormEnum.BIODIVERSITY_11] : biodiversity_11_col_defs,
    [FormEnum.BIODIVERSITY_12] : biodiversity_12_col_defs,
    
    [FormEnum.BIODIVERSITY_15] : biodiversity_15_col_defs,
    [FormEnum.BIODIVERSITY_16] : biodiversity_16_col_defs,
    [FormEnum.BIODIVERSITY_17] : biodiversity_17_col_defs,
    [FormEnum.BIODIVERSITY_19] : biodiversity_19_col_defs,
}

export const FormNameMap = {
    [FormEnum.LAND_1] : Sector.LAND,
    [FormEnum.LAND_2] : Sector.LAND,
    [FormEnum.LAND_3] : Sector.LAND,
    [FormEnum.LAND_4] : Sector.LAND,
    [FormEnum.LAND_5] : Sector.LAND,
    [FormEnum.LAND_6] : Sector.LAND,
    [FormEnum.LAND_7] : Sector.LAND,

    [FormEnum.FORESTRY_1] : Sector.FORESTRY,
    [FormEnum.FORESTRY_2] : Sector.FORESTRY,
    [FormEnum.FORESTRY_3] : Sector.FORESTRY,
    [FormEnum.FORESTRY_4] : Sector.FORESTRY,
    [FormEnum.FORESTRY_5] : Sector.FORESTRY,
    [FormEnum.FORESTRY_24] : Sector.FORESTRY,

    [FormEnum.BIODIVERSITY_2] : Sector.BIODIVERSITY,
    [FormEnum.BIODIVERSITY_3] : Sector.BIODIVERSITY,
    [FormEnum.BIODIVERSITY_4] : Sector.BIODIVERSITY,
    [FormEnum.BIODIVERSITY_5] : Sector.BIODIVERSITY,
    [FormEnum.BIODIVERSITY_6] : Sector.BIODIVERSITY,
    [FormEnum.BIODIVERSITY_7] : Sector.BIODIVERSITY,
    [FormEnum.BIODIVERSITY_8] : Sector.BIODIVERSITY,
    [FormEnum.BIODIVERSITY_9] : Sector.BIODIVERSITY,
    [FormEnum.BIODIVERSITY_10] : Sector.BIODIVERSITY,
    [FormEnum.BIODIVERSITY_11] : Sector.BIODIVERSITY,
    [FormEnum.BIODIVERSITY_12] : Sector.BIODIVERSITY,

    [FormEnum.BIODIVERSITY_15] : Sector.BIODIVERSITY,
    [FormEnum.BIODIVERSITY_16] : Sector.BIODIVERSITY,
    [FormEnum.BIODIVERSITY_17] : Sector.BIODIVERSITY,
    [FormEnum.BIODIVERSITY_19] : Sector.BIODIVERSITY,
}