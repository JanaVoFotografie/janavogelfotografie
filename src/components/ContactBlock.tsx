import { ContactForm } from "./ContactForm";

/** "Let's get in touch!" block with the contact form (June theme "contact block 1"). */
export function ContactBlock() {
  return (
    <div className="flo-block flo-block--full-width flo-block--no-padding flo-block--kontakt-contact" id="kontaktformular">
      <div className="flo-block__container">
        <div
          className="flo-block-contact-block-1 flo-block-contact-block-1--main flo-block-contact-block-1__custom-form flo-block-contact-block-1--image-position-center"
          style={{ "--ec": "#875940", "--lc": "#020000", "--bgc": "#c7a485" }}
        >
          <div className="flo-block-contact-block-1__form-area">
            <div className="flo-block-contact-block-1__info-area">
              <h3 className="flo-block-contact-block-1__info-title" data-font="5366bb815584">
                Let&apos;s get in touch!
              </h3>
            </div>
            <div className="flo-block-contact-block-1__form-section flo-block-contact-block-1__form-section--custom">
              {/* empty paragraphs left by WordPress' autop around the form (they add the original spacing) */}
              <p></p>
              <ContactForm />
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
