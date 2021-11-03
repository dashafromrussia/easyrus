import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('easrus.db')

export class DB {
  static initusers() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY NOT NULL, login STRING, password STRING, name STRING, surname STRING, country STRING, city STRING, age STRING, instagram STRING, facebook STRING, work STRING, activity STRING, about STRING, motherlan STRING, level STRING, myachives STRING, time STRING, image STRING, phone STRING, email STRING, friends STRING, fullname STRING)',
          [],
          resolve,
          (_, error) => reject(error)
        )
      })
    })
  }

  /*{login:login,password:password,name:name,surname:surname,country:country,city:city,
  age:age,instagram:inst,facebook:fb,work:work,activity:activity,about:about,motherlan:motherlang,
  level:level, myachives:takeach,image,time
}*/

static initrequestfriend() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS requestfriend (id INTEGER PRIMARY KEY NOT NULL, who STRING, whom STRING)',
        [],
        resolve,
        (_, error) => reject(error)
      )
    })
  })
}


static initstatus() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS statuses (id INTEGER PRIMARY KEY NOT NULL, userid STRING, status STRING)',
        [],
        resolve,
        (_, error) => reject(error)
      )
    })
  })
}

static initcontacts() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY NOT NULL, userid STRING, contacts STRING)',
        [],
        resolve,
        (_, error) => reject(error)
      )
    })
  })
}

static initcomments() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY NOT NULL, idpost STRING, who STRING, whom STRING, new STRING, comment STRING, time STRING)',
        [],
        resolve,
        (_, error) => reject(error)
      )
    })
  })
}



static initmess() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS messagess (id INTEGER PRIMARY KEY NOT NULL, name STRING NOT NULL, mess STRING, towhome STRING, images STRING, new STRING, redirect STRING, sharepost STRING, time STRING)',
        [],
        resolve,
        (_, error) => reject(error)
      )
    })
  })
}

static initblocks() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS block (id INTEGER PRIMARY KEY NOT NULL, userid STRING, blocks STRING)',
        [],
        resolve,
        (_, error) => reject(error)
      )
    })
  })
}

static initpech() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS pechat (id INTEGER PRIMARY KEY NOT NULL, whome STRING, name STRING)',
        [],
        resolve,
        (_, error) => reject(error)
      )
    })
  })
}
//{author:cookie.toString(), header:header,twoheader:twoheader,text:text,images:picture,category:checked,time:time,views:0,likes:[]}
static initArticle() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY NOT NULL, author STRING, header STRING, twoheader STRING, text STRING, images STRING, category STRING, time STRING, views INTEGER, likes STRING)',
        [],
        resolve,
        (_, error) => reject(error)
      )
    })
  })
}
//id INTEGER PRIMARY KEY NOT NULL, idpost STRING, who STRING, whom STRING, new STRING, comment STRING, time STRING

static addComment(data) { 
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO comments (idpost, who, whom, new, comment, time) VALUES (?, ?, ?, ?, ?, ?)`,
        [data.idpost, data.who, data.whom, data.new, data.comment, data.time],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      )
    })
  })
}

static deleteComment(data) { 
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM comments WHERE id ="${data.id}"`,
        [],
        resolve,
        (_, error) => reject(error)
      )
    })
  })
}

static loadComments() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM comments`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
} 

static addsArticle(data) { 
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO articles (author, header, twoheader, text, images, category, time, views, likes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.author, data.header, data.twoheader, data.text, JSON.stringify(data.images), data.category, data.time, data.views, JSON.stringify(data.likes)],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      )
    })
  })
}

static getArticles() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM articles`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
} 


static updateViews(data) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE articles SET views = ? WHERE id = ?`,
        [data.views, data.id],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
}


static updateLikes(data) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE articles SET likes = ? WHERE id = ?`,
        [JSON.stringify(data.likes), data.id],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
}



static deleteArticle(data) { 
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM articles WHERE id ="${data.id}"`,
        [],
        resolve,
        (_, error) => reject(error)
      )
    })
  })
}
//////////////////////////////////////////////////////////
static addPechat(data) { 
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO pechat (whome, name) VALUES (?, ?)`,
        [data.whome, data.name],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      )
    })
  })
}

static deletePechat(data) { 
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM pechat WHERE whome ="${data.whome}" AND name ="${data.name}"`,
        [],
        resolve,
        (_, error) => reject(error)
      )
    })
  })
}
///////////////////////////////////////////////
static getMessages(data) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM messagess WHERE name ="${data.name}" OR towhome ="${data.name}"`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
} 



static loadsPechat(data) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM pechat WHERE whome ="${data.whome}" AND name ="${data.name}"`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
} 

static addinBlock(data) { 
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO block (userid, blocks) VALUES (?, ?)`,
        [data.userid, JSON.stringify(data.blocks)],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      )
    })
  })
}

static updateOneBlock(data) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE block SET blocks = ? WHERE userid = ?`,
        [JSON.stringify(data.blocks), data.userid],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
}

static getBlock() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM block`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
} 

static deleteBlock() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM block`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
} 

static addMessage(data) { 
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO messagess (name, mess, towhome, images, new, redirect, sharepost, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.name, data.mess, data.towhome, JSON.stringify(data.images), data.new, JSON.stringify(data.redirect), JSON.stringify(data.sharepost), data.time],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      )
    })
  })
} 


/*static getMessages() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM messagess`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
} */

static deleteMessage(id) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM messagess WHERE id=${id}`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
} 

static deleteBlockMessages(data) { 
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM messagess WHERE name ="${data.name}" AND towhome="${data.towhome}"`,
        [],
        resolve,
        (_, error) => reject(error)
      )
    })
  })
}

static deleteAllMess() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM messagess`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
} 

static readMessages(data) { 
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE messagess SET new ="${data.new}" WHERE name ="${data.name}" AND towhome="${data.towhome}"`,
        [],
        resolve,
        (_, error) => reject(error)
      )
    })
  })
}


static loadContacts() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM contacts`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
}

static addContacts(data) { 
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO contacts (userid, contacts) VALUES (?, ?)`,
        [data.userid, JSON.stringify(data.contacts)],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      )
    })
  })
}

static updateOneContacts(data) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE contacts SET contacts = ? WHERE userid = ?`,
        [JSON.stringify(data.contacts), data.userid],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
}

static deleteContacts() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM contacts`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
}



static loadStatuses() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM statuses`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
}

static addStatus(data) { 
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO statuses (userid, status) VALUES (?, ?)`,
        [data.userid, data.status],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      )
    })
  })
}

static deleteStatus() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM statuses`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
}

static deleteOneStatus(id) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM statuses WHERE userid=${id}`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
}

static addRequestFriend(data) { 
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO requestfriend (who, whom) VALUES (?, ?)`,
        [data.who, data.whom],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      )
    })
  })
}

static loadReqFriends() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM requestfriend`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
}

static deleteReqFriend(id) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM requestfriend WHERE id=${id}`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
}


static deleteAllReqFriend() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM requestfriend`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    })
  })
}

    static loadUsers() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM user`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }

  

    static addUser(data) { 
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO user (login, password, name, surname, country, city, age, instagram, facebook, work, activity, about, motherlan, level, myachives, time, image, phone, email, friends, fullname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.login, data.password, data.name, data.surname, data.country, data.city, data.age, data.instagram, data.facebook, data.work, data.activity, data.about, data.motherlan, data.level, JSON.stringify(data.myachives), data.time, data.image, data.phone, data.email, JSON.stringify(data.friends), data.fullname],
            (_, result) => resolve(result.insertId),
            (_, error) => reject(error)
          )
        })
      })
    }

    static deleteOne() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `DELETE FROM user`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }

  /*{login:login,password:password,name:name,surname:surname,country:country,city:city, age:age,instagram:inst,facebook:fb,work:work,activity:activity,about:about,motherlan:motherlang,level:level, myachives:takeach,image,time
}*/


   static updateData({id,data}) { 
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `UPDATE user SET login = ?, password = ?, name = ?, surname = ?, country = ?, city = ?, age = ?, instagram = ?, facebook = ?, work = ?, activity = ?, about = ?, motherlan = ?, level = ?, myachives = ?, time = ?, image = ?, phone = ?, email = ?, friends = ? fullname = ? WHERE id = ?`,
            [data.login, data.password, data.name, data.surname, data.country, data.city, data.age, data.instagram, data.facebook, data.work, data.activity, data.about, data.motherlan, data.level, JSON.stringify(data.myachives), data.time, data.image, data.phone, data.email, JSON.toString(data.friends), data.fullname, id],
            (_, result) => resolve(result.insertId),
            (_, error) => reject(error)
          )
        })
      })
    } 




    static updateStatus(data) { 
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `UPDATE statuses SET status = ? WHERE userid = ?`,
            [data.status, data.userid],
            (_, result) => resolve(result.insertId),
            (_, error) => reject(error)
          )
        })
      })
    } 


    static updateMyFriend(data) { 
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `UPDATE user SET friends = ? WHERE id = ?`,
            [JSON.stringify(data.friends), data.id],
            (_, result) => resolve(result.insertId),
            (_, error) => reject(error)
          )
        })
      })
    }

    /*static updateData({id,data}) { 
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `UPDATE userss login ="${data.login}", password="${data.password}", name="${data.name}", surname="${data.surname}", country="${data.country}", city=${data.city}, age="${data.age}", instagram="${data.instagram}", facebook="${data.facebook}", work="${data.work}", activity="${data.activity}", about="${data.about}", motherlan="${data.motherlan}", level="${data.level}", myachives="${JSON.stringify(data.myachives)}", time="${data.time}", image="${data.image}" SET  WHERE id ="${id}"`,
            [],
            (_, result) => resolve(result.insertId),
            (_, error) => reject(error)
          )
        })
      })
    } */

    /*static addData(data) { 
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO data (category, data) VALUES (?, ?)`,
            [data.category, JSON.stringify(data.data)],
            (_, result) => resolve(result.insertId),
            (_, error) => reject(error)
          )
        })
      })
    } 


    static loadData() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM data`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }

    static deleteData() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `DELETE FROM data`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }

    static deleteAllComments() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `DELETE FROM comments`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }

    static deleteComment(id) {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `DELETE FROM comments WHERE id=${id}`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }

    static deleteCatComment(id) {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `DELETE FROM comments WHERE idpost=${id}`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }

    static deletePost(id) {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `DELETE FROM data WHERE id=${id}`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }
  

    static loadLogin() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM login`,
            [],
            (_, result) => resolve(result.rows._array),
            (_, error) => reject(error)
          )
        })
      })
    }

    static addLogin(data) { 
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO login (name, password) VALUES (?, ?)`,
            [data.name,data.password],
            (_, result) => resolve(result.insertId),
            (_, error) => reject(error)
          )
        })
      })
    } 
  


      static loadComments() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM comments`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }


      static addComment(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO comments (name, comment, time, idpost) VALUES (?, ?, ?, ?)`,
              [data.name,data.comment,data.time,data.idpost],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } */
    }