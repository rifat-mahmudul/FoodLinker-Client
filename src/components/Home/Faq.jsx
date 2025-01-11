import Container from "../Shared/Container"
import FaqQuestion from "../Shared/FaqQuestion"
import Title from "../Shared/Title"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"

const Faq = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <section className="pb-24 pt-8 overflow-hidden">
            
            <Title title='Frequently Asked Questions' description=''></Title>

            <Container>

                <div data-aos="fade-left"  data-aos-duration="2000" className="p-5 bg-[#0000ff13] mt-10 rounded-lg">

                    <div className="bg-[#0000ff0f] p-5 rounded-lg">

                        <FaqQuestion
                        question='What is this website about?'
                        ans='This website is a platform where users can share excess food with others in need and manage requests for shared food.'
                        >
                        </FaqQuestion>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Who can use this platform?'
                            ans='Anyone who wants to share food or request food can register and use the platform.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='How do I create an account?'
                            ans='You can create an account by clicking on the "Sign Up" button, filling in your details, and verifying your email.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Is the platform free to use?'
                            ans='Yes, the platform is free for both food donors and requesters.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='How can I add food to share?'
                            ans='You can add food by navigating to the "Add Food" section, providing details such as food type, quantity, location, and availability.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Can I update the details of food I’ve shared?'
                            ans='Yes, you can edit the food details from the "Manage My Foods" section.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='How do I delete food that is no longer available?'
                            ans='Yes, Go to the "Manage My Foods" section and click the delete button for the specific food item.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='How do I request food?'
                            ans='Browse the available food items, click on the desired food, and submit a request form specifying your contact details and pick-up preferences.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Can I view or manage my requested foods?'
                            ans='Yes, all your requests will be visible in the "My Request Foods" section, where you can track their status or cancel requests if needed.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='How does the food-sharing process work after I request food?'
                            ans='After you submit a request, the food donor will review it. If approved, you will receive a notification with details on how to collect the food.'
                            >
                            </FaqQuestion>
                        </div>

                    </div>

                </div>

            </Container>

        </section>
    )
}

export default Faq
