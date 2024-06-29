import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDataContext } from "../../../context/Context";

const LoanForm = () => {
    const { userID } = useDataContext();
    const validationSchema = Yup.object({
        loanAmount: Yup.number()
            .required("Loan Amount is required")
            .positive("Amount must be positive"),
        loanPurpose: Yup.string().required("Loan Purpose is required"),
        monthlyIncome: Yup.number()
            .required("Monthly Income is required")
            .positive("Income must be positive"),
        employmentStatus: Yup.string().required("Employment Status is required"),
        loanTerm: Yup.number()
            .max(72)
            .required("Loan Term is required")
            .positive("Term must be positive"),
    });

    const formik = useFormik({
        initialValues:{
            userId: userID.Id,
            loanAmount: "",
            loanPurpose: "",
            status: "pending",
            monthlyIncome: "",
            employmentStatus: "",
            loanTerm: "",
        },
        validationSchema:validationSchema,
onSubmit: (values, {resetForm }) => {
    axios
        .post("http:localhost:5050/api/loan", values)
        .then((response) => {
            console.log("Loan application submitted:", response.data);
            resetForm();
        })
        .catch((error) => {
            console.error(
                "There was an error submitting the loan application!",
                error
            );
        })

}
    })


   
    return (
        <>
            <section id='loanForm'>
                <div className="container">
 
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                        <h1 className="text-dark-emphasis my-5">Loan Application Form</h1>
                            <form onClick={formik.handleSubmit}>
                            <input placeholder="LoanAmount" className="form-control my-2" id="loanAmount" name="loanAmount" type="number" onChange={formik.handleChange} value={formik.values.loanAmount} />
              {formik.errors.loanAmount ? <div style={{ color: "red" }}>{formik.errors.loanAmount}</div> : null}

                                
                                <select className="form-select" onChange={formik.handleChange} value={formik.values.loanPurpose} name="loanPurpose" id="loanPurpose">
                                    <option selected disabled value="" >Loan Purpose</option>
                                    <option value="cars">Cars Loan</option>
                                    <option value="personal">Personal Loan</option>
                                    <option value="home">Home Loan</option>
                                </select>
                                {formik.errors.loanPurpose ? <div style={{ color: "red" }}>{formik.errors.loanPurpose}</div> : null}


                                <input placeholder="Monthly Income" className="form-control my-2" id="monthlyIncome" name="monthlyIncome" type="number" onChange={formik.handleChange} value={formik.values.monthlyIncome} />
              {formik.errors.monthlyIncome ? <div style={{ color: "red" }}>{formik.errors.monthlyIncome}</div> : null}
                                <input placeholder="Employment Status" className="form-control my-2" id="employmentStatus" name="employmentStatus" type="text" onChange={formik.handleChange} value={formik.values.employmentStatus} />
              {formik.errors.employmentStatus ? <div style={{ color: "red" }}>{formik.errors.employmentStatus}</div> : null}
                                <input placeholder="Loan tearm (in months)" className="form-control my-2" id="loanTerm" name="loanTerm" type="number" onChange={formik.handleChange} value={formik.values.loanTerm} />
              {formik.errors.loanTerm ? <div style={{ color: "red" }}>{formik.errors.loanTerm}</div> : null}

                                <button className="btn btn-dark my-4" type="submit"> Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoanForm