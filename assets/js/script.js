const now = new Date(); //scritta all'inizio perchè serve in più punti diversi
const getYear = now.getFullYear();
const getMonth = now.getMonth();
const appointments = [];

console.log(getYear);
console.log(getMonth);

const monthNames = [
    'Gennaio',
    'Febbario',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
];

const dayNames = [
    'Domenica',
    'Lunedì',
    'Martedì',
    'Mercoledì',
    'Giovedì',
    'Venerdì',
    'Sabato',
];

//scriviamo il nome del mese
const printCurrentMonth = () => {
    const title = document.querySelector('h1');
    const currentMonth = monthNames[getMonth];
    title.textContent = currentMonth;
};

printCurrentMonth();

const dayInMonth = () => {
    const lastDay = new Date(getYear, getMonth + 1, 0); //Chiediamo di trovare il giorno 0 del mese successivo.
    //Siccome il giorno 0 giugno non esiste, restituisce il 31 maggio.
    const numberOfDays = lastDay.getDate();
    return numberOfDays;
};

//Creiamo la Griglia
const createDays = (daysNumber) => {
    const calendarDiv = document.querySelector('#calendar');
    for (let i = 1; i <= daysNumber; i++) {
        const dayCellDiv = document.createElement('div');
        dayCellDiv.classList.add('day');
        //le celle devono essere cliccabili- DA FARE
        dayCellDiv.addEventListener('click', function () {
            unselectAllDays(); //deselezionare il giorno selezionato prima
            dayCellDiv.classList.add('selected');
            changeMeetingDay(i);
            if  (appointments[i] && appointments.length > 0) {
                showAppointments(i);
            } else {
                const appointmentsDiv = document.querySelector('#appointments');
                appointmentsDiv.style.display = 'none';
            }
        });

        //creiamo il giorno
        const cellValue = document.createElement('h3');


        //evidenzimo giorno corrente
        if (i === now.getDate()) {
            dayCellDiv.classList.add('currentDay');
        }

        //scriviamo domeniche in rosso
        let thisDay = new Date(getYear, getMonth, i);
        if (thisDay.getDay() === 0) {
            cellValue.classList.add('sunday');
        }

        //scriviamo nome del giorno
        let dayNumber = thisDay.getDay();
        let dayName = dayNames[dayNumber];
        cellValue.textContent = `${dayName} ${i}`;
        dayCellDiv.appendChild(cellValue);
        calendarDiv.appendChild(dayCellDiv);
    }

};

createDays(dayInMonth());

function unselectAllDays() {
    const previousSelected = document.querySelector('.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
};

function changeMeetingDay(i) {
    const newMeetingDay = document.querySelector('#newMeetingDay');
    newMeetingDay.textContent = i; 
    newMeetingDay.classList.add('daySelected');
}

//Creare funzione showAppointments
const meetingForm = document.querySelector('form');
