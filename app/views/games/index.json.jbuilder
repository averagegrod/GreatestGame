json.array!(@games) do |game|
  json.extract! game, :id, :name, :caption, :image
  json.url game_url(game, format: :json)
end
