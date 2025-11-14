import groq from 'groq'

export const ContactFormTypeQuery = groq`
  _type == "contactFormType" => {
    heading,
    description,
    ...,
    design,

   "fields": formular->fields[] {
  label,
  placeholder,
  type,
  required,
  options
},

    "redirectAfterSubmit": formular->redirectAfterSubmit,
    "redirectUrl": formular->redirectPage->slug.current,
    "recipientEmail": formular->recipientEmail,
    "submitButtonText": formular->submitButtonText,
    "loadingButtonText": formular->loadingButtonText,
    "successMessage": formular->successMessage,
  }
`
