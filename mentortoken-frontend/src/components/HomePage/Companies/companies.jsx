import AdobeLogo from "../../../images/companieslogo/AdobeLogo.svg?react"
import BrazeLogo from "../../../images/companieslogo/BrazeLogo.svg?react"
import HellosignLogo from "../../../images/companieslogo/HellosignLogo.svg?react"
import MazeLogo from "../../../images/companieslogo/MazeLogo.svg?react"
import GhostLogo from "../../../images/companieslogo/GhostLogo.svg?react"
import AtlassianLogo from "../../../images/companieslogo/AtlassianLogo.svg?react"
import TreehouseLogo from "../../../images/companieslogo/TreehouseLogo.svg?react"
import IntercomLogo from "../../../images/companieslogo/IntercomLogo.svg?react"
import OpendoorLogo from "../../../images/companieslogo/OpendoorLogo.svg?react"
import HubspotLogo from "../../../images/companieslogo/HubspotLogo.svg?react"
import "./companies.css"

const Companies = () => {
    return (
        <div className="companies-container">
            <div className="companies-logo">

                <div className="companies-logo-row">
                    <div><AdobeLogo/></div>
                    <div><BrazeLogo/></div>
                    <div><HellosignLogo/></div>
                    <div><MazeLogo/></div>
                    <div><GhostLogo/></div>
                </div>

                <div className="companies-logo-row">
                    <div><AtlassianLogo/></div>
                    <div><TreehouseLogo/></div>
                    <div><IntercomLogo/></div>
                    <div><OpendoorLogo/></div>
                    <div><HubspotLogo/></div>
                </div>
            
            </div>
            <p>More than 25+ Startups around the <br /> world trusted Mentor Token.</p>
        </div>
    );
};

export default Companies