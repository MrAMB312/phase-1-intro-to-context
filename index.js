// Your code here
function createEmployeeRecord (employeeRecordArray) {
    return {
        firstName: employeeRecordArray[0],
        familyName: employeeRecordArray[1],
        title: employeeRecordArray[2],
        payPerHour: employeeRecordArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords (employeeRecordsArray) {
    const employeeRecords = [];

    for (const array of employeeRecordsArray) {
        const employeeRecord = createEmployeeRecord(array);
        employeeRecords.push(employeeRecord);
    }

    return employeeRecords;
}

function createTimeInEvent (employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(' ');

    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(time),
        date: date,
    };

    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

function createTimeOutEvent (employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(' ');

    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(time),
        date: date,
    };

    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

function hoursWorkedOnDate (employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour)/100;
}

function wagesEarnedOnDate (employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate (employeeRecord, date);
    return (hoursWorked * employeeRecord.payPerHour);
}

function allWagesFor (employeeRecord) {
    // get all unique dates from timeInEvents
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);

    // calculate total wages by accumulating wages earned for each date
    return datesWorked.reduce((totalWages, date) => {
        return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
}

function calculatePayroll (employeeRecordsArray) {
    // get total wages for each employee
    const totalWagesPerEmployee = employeeRecordsArray.map(employee => allWagesFor(employee));

    // calculate total wages by accumulating wages for each employee
    return totalWagesPerEmployee.reduce((totalWages, wages) => totalWages + wages, 0);
}