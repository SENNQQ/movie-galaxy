import React, {useState} from 'react';
import MediaNav from "../../components/MediaNav";
import '../../style/catalog.scss';
import tempImage from '../../image/zOGINv5sJxEZQWw2dGuO8JUzvyK.jpg'

const Catalog = () => {

    const [tab, setTab] = useState<string>('allcatalog')
    const menu = ["All Catalog", "Currently Watching", "Completed", "On Hold", "Dropped", "Plan to Watch"]

    const changeTab = (nameTab: string): void => {
        setTab(nameTab);
    }

    return (
        <>
            <div className="navbar_header">
                <MediaNav menu={menu} changeTabHandler={changeTab}
                          styleContainer={{margin: 0, width:'100%'}} styleButton={{margin:'0 2rem'}}/>
            </div>
            <div className="list_block">
                <div className="list_unit">
                    <div className="list_status_title">
                        <span className="text">All catalog</span>
                    </div>
                    <table className="list_table">
                        <tbody>
                        <tr className="list_table_header">
                            <th className="header_title status"></th>
                            <th className="header_title number"> #</th>
                            <th className="header_title image"> Image</th>
                            <th className="header_title title"> Title</th>
                            <th className="header_title score"> Score</th>
                            <th className="header_title type"> Type</th>
                            <th className="header_title progress"> Progress</th>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr className="list_table_data">
                            <td className="data status watching"></td>
                            <td className="data number">1</td>
                            <td className="data image">
                                <img src={tempImage} alt=""/>
                            </td>
                            <td className="data title">
                                <a href="#" className="link sort">Top Gun: Maveric</a>
                            </td>
                            <td className="data score">
                                <span className="score_label">7</span>
                            </td>
                            <td className="data type">Movie</td>
                            <td className="data progress">
                                <span>228</span>/
                                <span>228</span>
                            </td>
                        </tr>
                        <tr className="list_table_data">
                            <td className="data status watching"></td>
                            <td className="data number">1</td>
                            <td className="data image">
                                <img src={tempImage} alt=""/>
                            </td>
                            <td className="data title">
                                <a href="#" className="link sort">Top Gun: Maveric</a>
                            </td>
                            <td className="data score">
                                <span className="score_label">7</span>
                            </td>
                            <td className="data type">Movie</td>
                            <td className="data progress">
                                <span>228</span>/
                                <span>228</span>
                            </td>
                        </tr>
                        <tr className="list_table_data">
                            <td className="data status completed"></td>
                            <td className="data number">1</td>
                            <td className="data image">
                                <img src={tempImage} alt=""/>
                            </td>
                            <td className="data title">
                                <a href="#" className="link sort">Top Gun: Maveric</a>
                            </td>
                            <td className="data score">
                                <span className="score_label">7</span>
                            </td>
                            <td className="data type">Movie</td>
                            <td className="data progress">
                                <span>228</span>/
                                <span>228</span>
                            </td>
                        </tr>
                        <tr className="list_table_data">
                            <td className="data status on_hold"></td>
                            <td className="data number">1</td>
                            <td className="data image">
                                <img src={tempImage} alt=""/>
                            </td>
                            <td className="data title">
                                <a href="#" className="link sort">Top Gun: Maveric</a>
                            </td>
                            <td className="data score">
                                <span className="score_label">7</span>
                            </td>
                            <td className="data type">Movie</td>
                            <td className="data progress">
                                <span>228</span>/
                                <span>228</span>
                            </td>
                        </tr>
                        <tr className="list_table_data">
                            <td className="data status watching"></td>
                            <td className="data number">1</td>
                            <td className="data image">
                                <img src={tempImage} alt=""/>
                            </td>
                            <td className="data title">
                                <a href="#" className="link sort">Top Gun: Maveric</a>
                            </td>
                            <td className="data score">
                                <span className="score_label">7</span>
                            </td>
                            <td className="data type">Movie</td>
                            <td className="data progress">
                                <span>228</span>/
                                <span>228</span>
                            </td>
                        </tr>
                        <tr className="list_table_data">
                            <td className="data status dropped"></td>
                            <td className="data number">1</td>
                            <td className="data image">
                                <img src={tempImage} alt=""/>
                            </td>
                            <td className="data title">
                                <a href="#" className="link sort">Top Gun: Maveric</a>
                            </td>
                            <td className="data score">
                                <span className="score_label">7</span>
                            </td>
                            <td className="data type">Movie</td>
                            <td className="data progress">
                                <span>228</span>/
                                <span>228</span>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Catalog;