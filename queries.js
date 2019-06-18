const Pool = require('pg').Pool
const pool = new Pool({
  user: 'fcyyelmv',
  host: 'rosie.db.elephantsql.com',
  database: 'fcyyelmv',
  password: 'VoXuf9ANwmDlhdlbgfNYWEth9n33XN2W',
  port: 5432,
})

console.log(pool)

// Arguments: username and password. Return: User object ..
// IUAPSUDH;


const checkLoginDetails = (request, response) => {
  var email = request.params.email
  var password = request.params.password
  console.log(email)
  console.log(password)
  
  var sql = "SELECT sys_user_id, email, user_type, title, first_name, middle_names, last_name FROM sys_user WHERE email = $1 AND password = $2"
  pool.query(sql, [ email, password ], function(error, results){
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
  

}

//Arguments Committee_id. return: List of committee members
const getCommitteeMembers = (request, response) => {
  var committee_id = request.params.committee_id;
  var sql = "SELECT * FROM comittee_member NATURAL JOIN sys_user WHERE comittee_id = $1"
  pool.query(sql, [committee_id],(error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCommittees = (request, response) => {
    pool.query('SELECT * FROM comittee', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getCommittee = (request, response) => {
    var committee_id = request.params.committee_id;
    var sql = "SELECT * FROM comittee WHERE comittee_id = $1"
    pool.query(sql, [committee_id],(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows[0]);
    })
  }

  const getCommitteeAddress = (request, response) => {
    var address_id = request.params.address_id;
    var sql = "SELECT * FROM address WHERE address_id = $1"
    pool.query(sql, [address_id],(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows[0]);
    })
  }


  const getCommitteeDocuments = (request, response) => {
    var committee_id = request.params.committee_id;
    var sql = "SELECT * FROM document WHERE committee_id = $1"
    pool.query(sql, [committee_id],(error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }



  module.exports = {
    checkLoginDetails,
    getCommitteeMembers,
    getCommittees,
    getCommittee,
    getCommitteeAddress,
    getCommitteeDocuments
  }