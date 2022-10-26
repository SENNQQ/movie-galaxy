import React, {useEffect, useState} from 'react';
import MediaNav from "../../components/MediaNav";
import '../../style/catalog.scss';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "../../axios";
import {catalogType} from "../../store/catalog/types";
import {apiImgUrl} from "../../api/zxc";
import LoadableImage from "../../components/LoadableImage";
import cn from "classnames";

const Catalog = () => {

    const [catalogStatus, setCatalogStatus] = useState<catalogType[]>();

    const redirect = useNavigate();
    const params = useParams();

    const menu = ["All Catalog", "Currently Watching", "Completed", "On Hold", "Dropped", "Plan to Watch"]

    const changeTab = (nameTab: string): void => {
        if (nameTab === 'currently-watching')
            redirect('/catalog/1')
        if (nameTab === 'completed')
            redirect('/catalog/2')
        if (nameTab === 'on-hold')
            redirect('/catalog/3')
        if (nameTab === 'dropped')
            redirect('/catalog/4')
        if (nameTab === 'plan-to-watch')
            redirect('/catalog/5')
        if (nameTab === 'all-catalog')
            redirect('/catalog/6')
    }

    const poster = (item:string) => {
        if (item) {
            return `${apiImgUrl}/w370_and_h556_bestv2${item}`;
        } else {
            return '';
        }
    };

    useEffect(() => {
        if (params.status && params.status !== '6') {
            const data = async () => {
                return await axios.get('/api/catalog/getEntryStatus', {
                    params: {
                        status: params.status
                    }
                })
            }
            data().then(resolve => {
                if (resolve.status !== 204) {
                    setCatalogStatus(resolve.data.data)
                } else {
                    console.log(resolve.data.error)
                }
            })
        }else if(params.status === '6'){
            const data = async () => {
                return await axios.get('/api/catalog/getAllEntry',)
            }
            data().then(resolve => {
                if (resolve.status !== 204) {
                    setCatalogStatus(resolve.data.data)
                } else {
                    console.log(resolve.data.error)
                }
            })
        }
    }, [params.status])

    return (
        <>
            <div className="navbar_header">
                <MediaNav menu={menu} changeTabHandler={changeTab}
                          catalogIndex={params.status ? parseInt(params.status) === 6 ? 0 :  parseInt(params.status) : 0}
                          styleContainer={{margin: 0, width: '100%'}} styleButton={{margin: '0 2rem'}}/>
            </div>
            <div className="list_block">
                <div className="list_unit">
                    <div className="list_status_title">
                        <span
                            className="text">{(params.status && menu[parseInt(params.status)]) || 'All Catalog'}</span>
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
                        {catalogStatus && catalogStatus.map((item,index) => (
                            <tr className="list_table_data" key={`item-catalog-${item.id}-${item.name_mt_id}`}>
                                <td className={cn("data status", {
                                    'watching': item.status === 1,
                                    'completed': item.status === 2,
                                    'on_hold': item.status === 3,
                                    'dropped': item.status === 4,
                                    'plan_to_watch': item.status === 5
                                })}></td>
                                <td className="data number">{index+1}</td>
                                <td className="data image">
                                   <Link to={item.type_mt === 'tv'
                                       ? `/tv/${item.mt_id}`
                                       : `/movie/${item.mt_id}`} className="data_load_image">
                                       <LoadableImage src={poster(item.img_string)} alt=""/>
                                   </Link>
                                </td>
                                <td className="data title">
                                    <Link to={item.type_mt === 'tv'
                                        ? `/tv/${item.mt_id}`
                                        : `/movie/${item.mt_id}`} className="link sort">{item.name_mt_id}</Link>
                                </td>
                                <td className="data score">
                                    <span className="score_label">{item.score}</span>
                                </td>
                                <td className="data type">{item.type_mt.toUpperCase()}</td>
                                <td className="data progress">
                                    <span>{item.watchedep}</span>/
                                    <span>{item.episodes}</span>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Catalog;