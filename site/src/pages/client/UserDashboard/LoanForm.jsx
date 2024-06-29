import { Formik, Form, Field, ErrorMessage } from "formik";
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

    const initialValues = {
        userId: userID.Id,
        loanAmount: "",
        loanPurpose: "",
        status: "pending",
        monthlyIncome: "",
        employmentStatus: "",
        loanTerm: "",
    };

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        axios
            .post("http://localhost:5050/api/loan", values)
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
            .finally(() => {
                setSubmitting(false);
            });
    };
    return (
        // <section id='loanForm'>
        //     <div className="container">
        //         <div className="row">
        //             <div className="col-lg-6">
        //                 <form action="">
        //                     <input type="text"  placeholder='Loan Amount' />
        //                     <select name="" id="">
        //                         <option selected disabled >Loan Purpose</option>
        //                         <option value="cars">Cars Loan</option>
        //                         <option value="personal">Personal Loan</option>
        //                         <option value="home">Home Loan</option>
        //                     </select>
        //                     <input type="text"  placeholder='Montly Income' />
        //                     <input type="text"  placeholder='Employment Status' />
        //                     <input type="text"  placeholder='Loan tearm (in months)' />
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </section>
        <div>
            <h1>Loan Application Form</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="loanAmount">Loan Amount</label>
                            <Field type="number" id="loanAmount" name="loanAmount" />
                            <ErrorMessage name="loanAmount" component="div" />
                        </div>

                        <div>
                            <label htmlFor="loanPurpose">Loan Purpose</label>
                            <Field type="text" id="loanPurpose" name="loanPurpose" />
                            <ErrorMessage name="loanPurpose" component="div" />
                        </div>

                        <div>
                            <label htmlFor="monthlyIncome">Monthly Income</label>
                            <Field type="number" id="monthlyIncome" name="monthlyIncome" />
                            <ErrorMessage name="monthlyIncome" component="div" />
                        </div>

                        <div>
                            <label htmlFor="employmentStatus">Employment Status</label>
                            <Field
                                type="text"
                                id="employmentStatus"
                                name="employmentStatus"
                            />
                            <ErrorMessage name="employmentStatus" component="div" />
                        </div>

                        <div>
                            <label htmlFor="loanTerm">Loan Term (in months)</label>
                            <Field type="number" id="loanTerm" name="loanTerm" />
                            <ErrorMessage name="loanTerm" component="div" />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoanForm