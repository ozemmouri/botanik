class BrochuresController < ApplicationController
  def create
    if verify_recaptcha
      name  = params[:name]
      email = params[:email]
      phone = params[:phone]

      # Envoi de l'email via le mailer
      BrochureMailer.with(name: name, email: email, phone: phone).send_brochure.deliver_now

      # Chemin vers le fichier brochure (votre PDF dans public/brochures)
      file_path = Rails.root.join("public", "brochures", "brochure.pdf")

      # Envoi du fichier en téléchargement
      send_file file_path,
                type: "application/pdf",
                disposition: "attachment",
                filename: "brochure.pdf"
    else
      # En cas d'échec (ici, on peut rediriger ou afficher une alerte)
      redirect_to root_path, alert: "Échec de la vérification reCAPTCHA, veuillez réessayer."
    end
  end
end
