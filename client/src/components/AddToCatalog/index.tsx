import React, {useEffect} from 'react';
import st from './addtocatalog.module.scss'

const AddToCatalog = () => {

    useEffect(()=>{

    }, [])

    return (
        <div className={st.user_status_block}>
            <div className={st.user_status_add_list}>
                Add to Catalog
            </div>
           <div className={st.user_stat_line}>
               <select name="myinfo_status"
                       id="myinfo_status"
                       className={st.form_user_status}>
                   <option value="1">Watching</option>
                   <option value="2">Completed</option>
                   <option value="3">On-Hold</option>
                   <option value="4">Dropped</option>
                   <option value="5">Plan to Watch</option>
               </select>
               <div className={st.form_user_episode}>
                   <span> Episodes </span>
                   <input type="text"
                          id="my_info_watchedeps"
                          className={st.form_user_episode__input}
                          name="myinfo_watchedeps"/>
                   <span> / </span>
                   <span> 13 </span>
               </div>
           </div>
            <select name="myinfo_score"
                    id="myinfo_score"
                    className={st.form_user_score}>
                <option value="0">Select</option>
                <option value="10">(10) Masterpiece</option>
                <option value="9">(9) Great</option>
                <option value="8">(8) Very Good</option>
                <option value="7">(7) Good</option>
                <option value="6">(6) Fine</option>
                <option value="5">(5) Average</option>
                <option value="4">(4) Bad</option>
                <option value="3">(3) Very Bad</option>
                <option value="2">(2) Horrible</option>
                <option value="1">(1) Appalling</option>
            </select>
        </div>

    );
};

export default AddToCatalog;