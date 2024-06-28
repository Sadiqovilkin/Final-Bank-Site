import React from 'react'

const LoanForm = () => {
  return (
    <section id='loanForm'>
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <form action="">
                        <input type="text"  placeholder='Loan Amount' />
                        <select name="" id="">
                            <option selected disabled >Loan Purpose</option>
                            <option value="cars">Cars Loan</option>
                            <option value="personal">Personal Loan</option>
                            <option value="home">Home Loan</option>
                        </select>
                        <input type="text"  placeholder='Montly Income' />
                        <input type="text"  placeholder='Employment Status' />
                        <input type="text"  placeholder='Loan tearm (in months)' />
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default LoanForm