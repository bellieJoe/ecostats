import TableOfContents from "../../../../components/Forms/TableOfContents";


const LandTOC = () => {
    const contents = [
        { title: "Table 1", name : "Land Area", url : "/app/land/land_1" },
        { title: "Table 2", name : "Patrimonial Properties as of CY 2023", url : "/app/land/land_2" },
        { title: "Table 3", name : "Residential Free Patent Issued", url : "/app/land/land_3" },
    ]
    return (
        <>
            <TableOfContents contents={contents} />
        </>
    )
}

export default LandTOC;