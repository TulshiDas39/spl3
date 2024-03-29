import React from "react";
import styles from "./styles/head.module.scss";
import { Link } from "react-router-dom";
import { IQuestion } from "../../../utils/Models";
import { utilityService } from "../../../services/UtilityService";
export class Head{
    private questionData:IQuestion;
    constructor(questionData:IQuestion){
        this.questionData = questionData;
    }
    public getHead() {
        return (
            <div id={styles.head_bar}>
                <div id={styles.title}>
                    <h1 style={{ marginBottom: '2px' }}>{this.questionData.title}</h1>
                    <div id={styles.title_info} style={{ fontSize: '13px' }}>
                        <span className={styles.title_info_time} style={{ color: '#6a737c' }}> সময় </span>
                        <span id={styles.title_info_time} className="title_info_time" style={{ paddingRight: '8px' }}> { utilityService.getTimeInBengali_D_M_Y(this.questionData.datetime)}</span>
                        {/* <span className="title_info_view" style={{ color: '#6a737c' }}>দেখা</span>
                        <span id="title_info_view" className="title_info_view">৬</span> */}
                    </div>

                </div>
                <Link to="/ask" id={styles.ask_btn}>প্রশ্ন করুন</Link>
            </div>
        )
    }

}