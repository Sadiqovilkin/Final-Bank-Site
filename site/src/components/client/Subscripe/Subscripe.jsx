import React from 'react'

const Subscripe = () => {
  return (
    <section id='subscripe'>
        <div className="container-fluid">
            <div className="row justify-content-between">
                <div className="col-lg-5 g-4">
                    <h3 className="subscripeText">Subscribe us to Recieve Latest Updates</h3>
                </div>
                <div className="col-lg-6 g-4">
                    <form >
                        <input type="text" placeholder='Your Email'/>
                        <button>Subscripe Now</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Subscripe