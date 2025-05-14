Rails.application.routes.draw do
  get 'villas/:id', to: 'pages#show', as: :villa

  post 'brochure', to: 'brochures#create', as: :brochure
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  root "pages#index"

  get "presentation", to: "pages#presentation", as: "presentation"
  get "mot_architecte", to: "pages#mot_architecte", as: "mot_architecte"
  get "aedge", to: "pages#aedge", as: "aedge"
  get "typologies", to: "pages#typologies", as: "typologies"

end
