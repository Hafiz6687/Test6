

// =====================================================
// KALKULATOR AKTA KERJA 1955
// SCRIPT.JS
// FINAL INTEGRATION VERSION
// PART 1/4
// =====================================================



// =====================================================
// GLOBAL HELPER FUNCTION
// =====================================================



function getElement(id){

    return document.getElementById(id);

}





function setText(id,value){

    let element = getElement(id);


    if(element){

        element.innerHTML = value;

    }

}





function setValue(id,value){

    let element = getElement(id);


    if(element){

        element.value = value;

    }

}





function formatRM(value){


    value = Number(value) || 0;


    return "RM " +
    value.toLocaleString(
        "en-MY",
        {
            minimumFractionDigits:2,
            maximumFractionDigits:2
        }
    );


}









// =====================================================
// INPUT FORMULA ENGINE
// SUPPORT:
// 2500
// 2500+300
// 2500+300+200
// =====================================================



function calculateInput(value){



    if(!value){

        return 0;

    }



    try{


        return Function(
            "return " + value
        )();



    }
    catch(error){


        return 0;


    }


}









function getInputNumber(id){



    let element =
    getElement(id);



    if(!element){

        return 0;

    }



    return calculateInput(
        element.value
    );


}









// =====================================================
// UPDATE JUMLAH UPAH
// GAJI POKOK + ELAUN
// =====================================================



function updateSalaryTotal(
    basicID,
    allowanceID,
    totalID
){


    let basic =
    getInputNumber(
        basicID
    );



    let allowance =
    getInputNumber(
        allowanceID
    );



    let total =
    basic + allowance;



    setValue(
        totalID,
        formatRM(total)
    );


    return total;


}









// =====================================================
// AUTO UPDATE SEMUA JUMLAH UPAH
// =====================================================



document.addEventListener(
"input",
function(event){



    let id =
    event.target.id;



    const salaryMap = {


        // ORP

        "orpBasicSalary":[
            "orpAllowance",
            "orpTotalSalary"
        ],



        // OT BIASA

        "otBasicSalary":[
            "otAllowance",
            "otTotalSalary"
        ],



        // OT HARI REHAT

        "otRHBasicSalary":[
            "otRHAllowance",
            "otRHTotalSalary"
        ],



        // SEKSYEN 18A

        "section18ABasicSalary":[
            "section18AAllowance",
            "section18ATotalSalary"
        ],



        // GGN

        "ggnBasicSalary":[
            "ggnAllowance",
            "ggnTotalSalary"
        ],



        // HARI REHAT 1/2

        "rhBasicSalary":[
            "rhAllowance",
            "rhTotalSalary"
        ],



        // HARI REHAT LEBIH 1/2

        "rhMoreBasicSalary":[
            "rhMoreAllowance",
            "rhMoreTotalSalary"
        ],



        // HARI KELEPASAN

        "phBasicSalary":[
            "phAllowance",
            "phTotalSalary"
        ],



        // OT HARI KELEPASAN

        "otPHBasicSalary":[
            "otPHAllowance",
            "otPHTotalSalary"
        ]

    };





    if(
        salaryMap[id]
    ){



        let data =
        salaryMap[id];



        updateSalaryTotal(
            id,
            data[0],
            data[1]
        );

    }







    Object.keys(
        salaryMap
    )
    .forEach(
    function(key){



        if(
            id === salaryMap[key][0]
        ){


            updateSalaryTotal(
                key,
                id,
                salaryMap[key][1]
            );


        }


    });

// GGN AUTO LINK ORP

if(
    id === "orpBasicSalary" ||
    id === "orpAllowance"
){


    let basic =
    getInputNumber(
        "orpBasicSalary"
    );


    let allowance =
    getInputNumber(
        "orpAllowance"
    );



    setValue(
        "ggnBasicSalary",
        formatRM(basic)
    );



    setValue(
        "ggnAllowance",
        formatRM(allowance)
    );



    setValue(
        "ggnTotalSalary",
        formatRM(
            basic + allowance
        )
    );

}

});









// =====================================================
// KALKULATOR ORP
// FORMULA:
// (GAJI POKOK + ELAUN) ÷ 26
// =====================================================



function calculateORP(){



    let totalSalary =
    updateSalaryTotal(
        "orpBasicSalary",
        "orpAllowance",
        "orpTotalSalary"
    );



    let ORP =
    totalSalary / 26;



    setText(
        "orpResultTotal",
        formatRM(totalSalary)
    );



    setText(
        "orpResult",
        formatRM(ORP)
    );


}









// =====================================================
// RESET ORP
// =====================================================



function resetORP(){



    setValue(
        "orpBasicSalary",
        ""
    );


    setValue(
        "orpAllowance",
        ""
    );


    setValue(
        "orpTotalSalary",
        "RM 0.00"
    );



    setText(
        "orpResultTotal",
        "RM 0.00"
    );



    setText(
        "orpResult",
        "RM 0.00"
    );


}
// =====================================================
// SCRIPT.JS
// FINAL INTEGRATION VERSION
// PART 2/4
// =====================================================







// =====================================================
// KALKULATOR OT HARI BIASA
// =====================================================


function calculateOTBiasa(){


    let totalSalary =
    updateSalaryTotal(
        "otBasicSalary",
        "otAllowance",
        "otTotalSalary"
    );


    let hours =
    Number(
        getElement("otHours").value
    );


    let workingHours =
    Number(
        getElement("normalWorkingHours").value
    );


    if(!workingHours){

        alert(
            "Sila pilih jam kerja normal sehari."
        );

        return;

    }


    let ORP =
    totalSalary / 26;


    // Kadar sejam selepas darab 1.5
    let normalHourly =
    ORP / workingHours;


    let hourly =
    normalHourly * 1.5;


    let amount =
    hourly * hours;



    setText(
        "otResultTotal",
        formatRM(totalSalary)
    );


    setText(
        "otORP",
        formatRM(ORP)
    );


    setText(
        "otHourly",
        formatRM(hourly)
    );


    setText(
        "otAmount",
        formatRM(amount)
    );


}







function resetOTBiasa(){



    [
        "otBasicSalary",
        "otAllowance",
        "otHours"

    ]
    .forEach(
        id=>setValue(id,"")
    );



    setValue(
        "otTotalSalary",
        "RM 0.00"
    );



    setValue(
        "normalWorkingHours",
        ""
    );



    [
        "otResultTotal",
        "otORP",
        "otHourly",
        "otAmount"

    ]
    .forEach(
        id=>setText(id,"RM 0.00")
    );


}



// =====================================================
// KALKULATOR OT HARI REHAT
// =====================================================


function calculateOTRH(){


    let totalSalary =
    updateSalaryTotal(
        "otRHBasicSalary",
        "otRHAllowance",
        "otRHTotalSalary"
    );


    let hours =
    Number(
        getElement("otRHHours").value
    );


    let workingHours =
    Number(
        getElement("otRHNormalWorkingHours").value
    );


    if(!workingHours){

        alert(
            "Sila pilih jam kerja normal sehari."
        );

        return;

    }



    let ORP =
    totalSalary / 26;


    let normalHourly =
    ORP / workingHours;


    // Kadar sejam selepas x2.0
    let hourly =
    normalHourly * 2.0;


    let amount =
    hourly * hours;



    setText(
        "otRHResultTotal",
        formatRM(totalSalary)
    );


    setText(
        "otRHORP",
        formatRM(ORP)
    );


    setText(
        "otRHHourly",
        formatRM(hourly)
    );


    setText(
        "otRHAmount",
        formatRM(amount)
    );


}








function resetOTRH(){



    [
        "otRHBasicSalary",
        "otRHAllowance",
        "otRHHours"

    ]
    .forEach(
        id=>setValue(id,"")
    );



    setValue(
        "otRHTotalSalary",
        "RM 0.00"
    );



    setValue(
        "otRHNormalWorkingHours",
        ""
    );



    [
        "otRHResultTotal",
        "otRHORP",
        "otRHHourly",
        "otRHAmount"

    ]
    .forEach(
        id=>setText(id,"RM 0.00")
    );


}











// =====================================================
// KALKULATOR KERJA HARI REHAT
// 1/2 HARI @ KURANG
// =====================================================



function calculateHariRehat(){



    let totalSalary =
    updateSalaryTotal(
        "rhBasicSalary",
        "rhAllowance",
        "rhTotalSalary"
    );



    let days =
    Number(
        getElement(
            "rhDays"
        ).value
    );



    let ORP =
    totalSalary / 26;



    let daily =
    ORP;



    let amount =
    daily * days * 0.5;







    setText(
        "rhResultTotal",
        formatRM(totalSalary)
    );


    setText(
        "rhORP",
        formatRM(ORP)
    );


    setText(
        "rhDaily",
        formatRM(daily)
    );


    setText(
        "rhAmount",
        formatRM(amount)
    );


}









function resetHariRehat(){



    [
        "rhBasicSalary",
        "rhAllowance",
        "rhDays"

    ]
    .forEach(
        id=>setValue(id,"")
    );



    setValue(
        "rhTotalSalary",
        "RM 0.00"
    );



    [
        "rhResultTotal",
        "rhORP",
        "rhDaily",
        "rhAmount"

    ]
    .forEach(
        id=>setText(id,"RM 0.00")
    );


}












// =====================================================
// KALKULATOR KERJA HARI REHAT
// LEBIH 1/2 HARI
// =====================================================



function calculateHariRehatLebih(){



    let totalSalary =
    updateSalaryTotal(
        "rhMoreBasicSalary",
        "rhMoreAllowance",
        "rhMoreTotalSalary"
    );



    let days =
    Number(
        getElement(
            "rhMoreDays"
        ).value
    );



    let ORP =
    totalSalary / 26;



    let daily =
    ORP;



    let amount =
    daily * days;







    setText(
        "rhMoreResultTotal",
        formatRM(totalSalary)
    );



    setText(
        "rhMoreORP",
        formatRM(ORP)
    );



    setText(
        "rhMoreDaily",
        formatRM(daily)
    );



    setText(
        "rhMoreAmount",
        formatRM(amount)
    );


}









function resetHariRehatLebih(){



    [
        "rhMoreBasicSalary",
        "rhMoreAllowance",
        "rhMoreDays"

    ]
    .forEach(
        id=>setValue(id,"")
    );



    setValue(
        "rhMoreTotalSalary",
        "RM 0.00"
    );



    [
        "rhMoreResultTotal",
        "rhMoreORP",
        "rhMoreDaily",
        "rhMoreAmount"

    ]
    .forEach(
        id=>setText(id,"RM 0.00")
    );


}


// =====================================================
// KALKULATOR SEKSYEN 18A
// FORMULA:
// JUMLAH UPAH ÷ HARI KALENDAR BULAN
// SETIAP BULAN DIKIRA BERASINGAN
// =====================================================


function calculate18A(){


    let totalSalary =
    updateSalaryTotal(
        "section18ABasicSalary",
        "section18AAllowance",
        "section18ATotalSalary"
    );




    let startDate =
    getElement(
        "section18AStartDate"
    ).value;



    let endDate =
    getElement(
        "section18AEndDate"
    ).value;




    if(
        !startDate ||
        !endDate
    ){

        alert(
            "Sila masukkan tarikh mula dan tarikh akhir."
        );

        return;

    }





    let start =
    new Date(startDate);



    let end =
    new Date(endDate);





    if(end < start){


        alert(
            "Tarikh akhir tidak boleh lebih awal daripada tarikh mula."
        );


        return;

    }





    // ==========================================
    // DATA BULAN PERTAMA
    // ==========================================


    let startYear =
    start.getFullYear();



    let startMonth =
    start.getMonth();



    let month1CalendarDays =
    new Date(
        startYear,
        startMonth + 1,
        0
    )
    .getDate();




    let month1Days = 0;



    let month1Amount = 0;



    let month1DailyRate =
    totalSalary /
    month1CalendarDays;





    // ==========================================
    // DATA BULAN KEDUA
    // ==========================================


    let month2Days = 0;

    let month2Amount = 0;

    let month2CalendarDays = 0;

    let month2DailyRate = 0;





    let endYear =
    end.getFullYear();



    let endMonth =
    end.getMonth();






    // ==========================================
    // BULAN YANG SAMA
    // ==========================================


    if(
        startYear === endYear &&
        startMonth === endMonth
    ){



        month1Days =
        end.getDate()
        -
        start.getDate()
        +
        1;




        month1Amount =
        month1DailyRate *
        month1Days;



    }





    // ==========================================
    // MELIBATKAN 2 BULAN
    // ==========================================


    else{



        // Bulan pertama

        month1Days =
        month1CalendarDays
        -
        start.getDate()
        +
        1;




        month1Amount =
        month1DailyRate *
        month1Days;






        // Bulan kedua


        month2CalendarDays =
        new Date(
            endYear,
            endMonth + 1,
            0
        )
        .getDate();




        month2DailyRate =
        totalSalary /
        month2CalendarDays;




        month2Days =
        end.getDate();




        month2Amount =
        month2DailyRate *
        month2Days;



    }






    let totalAmount =
    month1Amount +
    month2Amount;








    // ==========================================
    // OUTPUT JUMLAH UPAH
    // ==========================================


    setText(
        "resultTotalSalary",
        formatRM(totalSalary)
    );







    // ==========================================
    // OUTPUT BULAN PERTAMA
    // ==========================================


    setText(
        "month1Title",
        start.toLocaleString(
            "ms-MY",
            {
                month:"long",
                year:"numeric"
            }
        )
    );




    setText(
        "month1Days",
        month1Days + " Hari"
    );




    setText(
        "month1Daily",
        formatRM(month1DailyRate)
    );




    setText(
        "month1Amount",
        formatRM(month1Amount)
    );








    // ==========================================
    // OUTPUT BULAN KEDUA
    // ==========================================


    if(
        month2Days > 0
    ){



        setText(
            "month2Title",
            end.toLocaleString(
                "ms-MY",
                {
                    month:"long",
                    year:"numeric"
                }
            )
        );



        setText(
            "month2Days",
            month2Days + " Hari"
        );



        setText(
            "month2Daily",
            formatRM(month2DailyRate)
        );



        setText(
            "month2Amount",
            formatRM(month2Amount)
        );



    }

    else{


        setText(
            "month2Title",
            "-"
        );


        setText(
            "month2Days",
            "-"
        );


        setText(
            "month2Daily",
            "-"
        );


        setText(
            "month2Amount",
            "-"
        );


    }







    // ==========================================
    // JUMLAH BAYARAN UPAH
    // ==========================================


    setText(
        "amount18A",
        formatRM(totalAmount)
    );



}






// =====================================================
// RESET SEKSYEN 18A
// =====================================================


function resetSeksyen18A(){



    [

        "section18ABasicSalary",
        "section18AAllowance",
        "section18AStartDate",
        "section18AEndDate"

    ]
    .forEach(
        id=>setValue(id,"")
    );





    setValue(
        "section18ATotalSalary",
        "RM 0.00"
    );






    [

        "resultTotalSalary",
        "month1Daily",
        "month2Daily",
        "month1Amount",
        "month2Amount",
        "amount18A"

    ]
    .forEach(
        id=>setText(
            id,
            "RM 0.00"
        )
    );







    [

        "month1Title",
        "month2Title",
        "month1Days",
        "month2Days"

    ]
    .forEach(
        id=>setText(
            id,
            "-"
        )
    );


}

// =====================================================
// KALKULATOR GAJI GANTI NOTIS (GGN)
// JENIS TEMPOH BULAN
// =====================================================

function calculateGGNMonth(){


    let month =
    Number(
        getElement("ggnMonthNotice").value
    );


    if(!month){

        alert(
            "Sila masukkan bilangan bulan notis."
        );

        return;

    }



 let totalSalary =
Number(
    getElement("ggnTotalSalary")
    .value
    .replace(/[^0-9.]/g,"")
);


    let amount =
    totalSalary * month;



    setText(
        "ggnResultMonth",
        month + " Bulan"
    );


    setText(
        "ggnAmount",
        formatRM(amount)
    );


}




// =====================================================
// KALKULATOR GAJI GANTI NOTIS (GGN)
// JENIS TEMPOH MINGGU
// =====================================================


function calculateGGNWeek(){



    let totalSalary =
    updateSalaryTotal(
        "ggnBasicSalary",
        "ggnAllowance",
        "ggnTotalSalary"
    );




    let week =
    Number(
        getElement(
            "ggnWeekNotice"
        ).value
    );




    let startDate =
    getElement(
        "ggnWeekStartDate"
    ).value;




    if(!week){


        alert(
            "Sila masukkan bilangan minggu notis."
        );


        return;

    }




    if(!startDate){


        alert(
            "Sila masukkan Tarikh Mula Notis."
        );


        return;

    }




    let start =
    new Date(startDate);




    let totalDays =
    week * 7;




    let end =
    new Date(start);



    end.setDate(
        end.getDate()
        +
        totalDays
        -
        1
    );





    let amount =
    calculateGGNByMonth(
        totalSalary,
        start,
        end
    );






    setText(
        "ggnWeekDays",
        totalDays + " Hari"
    );





    setText(
        "ggnWeekResultEndDate",
        end.toLocaleDateString(
            "ms-MY"
        )
    );





    setText(
        "ggnWeekAmount",
        formatRM(amount)
    );



}







function resetGGNMonth(){


    setValue(
        "ggnMonthNotice",
        ""
    );


    setText(
        "ggnResultMonth",
        "0 Bulan"
    );


    setText(
        "ggnAmount",
        "RM 0.00"
    );


}






// =====================================================
// RESET GGN MINGGU
// =====================================================


function resetGGNWeek(){



    [

        "ggnWeekNotice",
        "ggnWeekStartDate",
        "ggnWeekEndDate"

    ]
    .forEach(
        id=>setValue(id,"")
    );





    setText(
        "ggnWeekDays",
        "0 Hari"
    );



    setText(
        "ggnWeekResultEndDate",
        "-"
    );



    setText(
        "ggnWeekAmount",
        "RM 0.00"
    );



}





// =====================================================
// KIRA GGN IKUT BILANGAN HARI
// (DIGUNAKAN OLEH MINGGU)
// =====================================================


function calculateGGNByMonth(
    salary,
    start,
    end
){



    let total = 0;



    let current =
    new Date(start);





    while(
        current <= end
    ){



        let year =
        current.getFullYear();



        let month =
        current.getMonth();




        let monthDays =
        new Date(
            year,
            month + 1,
            0
        )
        .getDate();




        let firstDay =
        current.getDate();




        let lastDay =
        monthDays;



        if(
            year === end.getFullYear()
            &&
            month === end.getMonth()
        ){


            lastDay =
            end.getDate();


        }




        let days =
        lastDay -
        firstDay
        +
        1;





        let dailyRate =
        salary /
        monthDays;





        total +=
        dailyRate *
        days;




        current =
        new Date(
            year,
            month + 1,
            1
        );


    }





    return total;


}








// =====================================================
// FORMAT TARIKH INPUT
// YYYY-MM-DD
// =====================================================


function formatDateInput(date){



    let year =
    date.getFullYear();



    let month =
    String(
        date.getMonth()+1
    )
    .padStart(2,"0");



    let day =
    String(
        date.getDate()
    )
    .padStart(2,"0");



    return (
        year +
        "-" +
        month +
        "-" +
        day
    );


}












// =====================================================
// SCRIPT.JS
// FINAL INTEGRATION VERSION
// PART 4/4
// =====================================================







// =====================================================
// GET ORP CURRENT VALUE
// DIGUNAKAN OLEH CUTI
// =====================================================



function getORP(){



    let totalSalary =
    updateSalaryTotal(
        "orpBasicSalary",
        "orpAllowance",
        "orpTotalSalary"
    );



    return totalSalary / 26;


}











// =====================================================
// KALKULATOR CUTI TAHUNAN
// =====================================================



function calculateCutiTahunan(){



    let ORP =
    getORP();



    let days =
    Number(
        getElement(
            "annualLeaveDays"
        ).value
    );





    let amount =
    ORP * days;





    setText(
        "annualLeaveORP",
        formatRM(ORP)
    );



    setText(
        "annualLeaveAmount",
        formatRM(amount)
    );



}









function resetCutiTahunan(){



    setValue(
        "annualLeaveDays",
        ""
    );



    setText(
        "annualLeaveORP",
        "RM 0.00"
    );



    setText(
        "annualLeaveAmount",
        "RM 0.00"
    );


}











// =====================================================
// KALKULATOR CUTI SAKIT
// =====================================================



function calculateCutiSakit(){



    let ORP =
    getORP();



    let days =
    Number(
        getElement(
            "sickLeaveDays"
        ).value
    );





    let amount =
    ORP * days;





    setText(
        "sickLeaveORP",
        formatRM(ORP)
    );



    setText(
        "sickLeaveAmount",
        formatRM(amount)
    );



}









function resetCutiSakit(){



    setValue(
        "sickLeaveDays",
        ""
    );



    setText(
        "sickLeaveORP",
        "RM 0.00"
    );



    setText(
        "sickLeaveAmount",
        "RM 0.00"
    );


}











// =====================================================
// KALKULATOR KERJA PADA HARI KELEPASAN
// =====================================================



function calculatePH(){



    let totalSalary =
    updateSalaryTotal(
        "phBasicSalary",
        "phAllowance",
        "phTotalSalary"
    );





    let days =
    Number(
        getElement(
            "phDays"
        ).value
    );





    let ORP =
    totalSalary / 26;





    let daily =
    ORP;





    let amount =
    daily *
    days *
    2;







    setText(
        "phResultTotal",
        formatRM(totalSalary)
    );



    setText(
        "phORP",
        formatRM(ORP)
    );



    setText(
        "phDaily",
        formatRM(daily)
    );



    setText(
        "phAmount",
        formatRM(amount)
    );



}









function resetPH(){



    [

        "phBasicSalary",
        "phAllowance",
        "phDays"

    ]
    .forEach(
        id=>setValue(id,"")
    );





    setValue(
        "phTotalSalary",
        "RM 0.00"
    );





    [

        "phResultTotal",
        "phORP",
        "phDaily",
        "phAmount"

    ]
    .forEach(
        id=>setText(id,"RM 0.00")
    );



}











// =====================================================
// KALKULATOR OT HARI KELEPASAN
// =====================================================



function calculateOTPH(){



    let totalSalary =
    updateSalaryTotal(
        "otPHBasicSalary",
        "otPHAllowance",
        "otPHTotalSalary"
    );





    let hours =
    Number(
        getElement(
            "otPHHours"
        ).value
    );





    let workingHours =
    Number(
        getElement(
            "otPHWorkingHours"
        ).value
    );





    if(!workingHours){


        alert(
            "Sila pilih jam kerja normal sehari."
        );


        return;

    }






    let ORP =
    totalSalary / 26;





    let hourly =
    ORP /
    workingHours;





    let amount =
    hourly *
    3 *
    hours;








    setText(
        "otPHResultTotal",
        formatRM(totalSalary)
    );



    setText(
        "otPHORP",
        formatRM(ORP)
    );



    setText(
        "otPHHourly",
        formatRM(hourly)
    );



    setText(
        "otPHAmount",
        formatRM(amount)
    );



}









function resetOTPH(){



    [

        "otPHBasicSalary",
        "otPHAllowance",
        "otPHHours"

    ]
    .forEach(
        id=>setValue(id,"")
    );






    setValue(
        "otPHTotalSalary",
        "RM 0.00"
    );






    setValue(
        "otPHWorkingHours",
        ""
    );






    [

        "otPHResultTotal",
        "otPHORP",
        "otPHHourly",
        "otPHAmount"

    ]
    .forEach(
        id=>setText(id,"RM 0.00")
    );



}











// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener(
"DOMContentLoaded",
function(){

    // Tiada initialization diperlukan buat masa ini.

});
