class BrochureMailer < ApplicationMailer
  default from: 'oth.zemmouri@gmail.com'

  def send_brochure
    @name  = params[:name]
    @phone = params[:phone]
    @contact_email = params[:email]

    mail(to: "oth.zemmouri@gmail.com", subject: "Demande de brochure de #{@name}")
  end
end
