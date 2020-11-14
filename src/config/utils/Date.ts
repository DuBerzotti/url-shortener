class TodayDate {

    public static GetDate(): string 
    {
        const now = new Date();
        var dd = String(now.getDate()).padStart(2, '0');
        var mm = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = now.getFullYear();

        const AccessDay = dd + '/' + mm + '/' + yyyy

        return AccessDay   
    }

    public static GetHour(): number 
    {
        const now = new Date();

        var Hour = now.getHours()

        return Hour   
    }
}

export default TodayDate