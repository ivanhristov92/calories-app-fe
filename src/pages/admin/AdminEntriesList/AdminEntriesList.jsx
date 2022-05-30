import SectionEntries from "./section-entries/SectionEntriesList"
import "./AdminEntriesList.module.css"

export default function(){
    
    return (
        <div style={{padding: 20}}>
            <h3 style={{padding: 20}}>Manage Entries</h3>
            <SectionEntries />
        </div>
    )
}