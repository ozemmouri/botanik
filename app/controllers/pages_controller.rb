class PagesController < ApplicationController

  def index
    @slides = [
      { image_url: "villa_nuit.jpg", title: "Le Projet", description: "Le domaine où le luxe se fait silence", cta: "Découvrez le projet Botanik Garden", link: presentation_path },
      { image_url: "villa_type_D_1.jpg", title: "Nos Villas", description: "Découvrez nos villas", cta: "Votre oasis sur-mesure", link: typologies_path },
      { image_url: "villa_type_D_2.jpg", title: "Aedge Partners", description: "Qui sommes nous ?", cta: "En savoir plus", link: aedge_path },
    ]
  end

  def show
    @villa = params[:id]
    render partial: "villas/#{@villa}", locals: { villa: @villa }
  end

  def presentation
  end

  def mot_architecte
  end

  def aedge
  end

  def typologies
    @slides = [
      { image_url: "face-GA.jpg", title: "Le Projet", description: "Lorem ipsum dolor sit amet.", cta: "Lorem ipsum", link: "#" },
      { image_url: "face-MA.jpg", title: "Localisation", description: "Lorem ipsum dolor sit amet.", cta: "Lorem ipsum", link: "#" },
      { image_url: "face-PA.jpg", title: "Le Concept", description: "Lorem ipsum dolor sit amet.", cta: "Lorem ipsum", link: "#" },
    ]
  end

end
