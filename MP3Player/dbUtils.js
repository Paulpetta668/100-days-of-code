class Utils {
    constructor (module){
        this.con = module.createConnection({
            host: "api.paolopocaterra.me",
            user: "APIMP3",
            password: "wT80w4O*",
            database: "mp3player"
        });

        this.con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        });
    }

    testCredentials(u, p, e){
        if(u.length < 8) return false;
        if(p.length < 8) return false;

        if(!e.includes("@")) return false;
        if(!e.includes(".")) return false;

        if(e.indexOf("@") > e.indexOf(".")) return false;
        if(e.indexOf("@") == 0) return false;
        if(e.indexOf(".") == e.length - 1) return false;

        return true;
    }

    searchSong(songName){
        
    }
    addSong(songName){
        
    }

    registerUser(username, password, email){
        
    }
    loginUser(username, password){
        
    }
}

module.exports = Utils;
