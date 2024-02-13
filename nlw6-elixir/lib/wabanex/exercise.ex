defmodule Wabanex.Exercise do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  @fields [:name, :protocol, :repetitions, :video_url]

  schema "exercises" do
    belongs_to :training, Wabanex.Training
    field :name, :string
    field :protocol, :string
    field :repetitions, :string
    field :video_url, :string

    timestamps()
  end

  def changeset(exercise, params) do
    exercise
    |> cast(params, @fields)
    |> validate_required(@fields)
  end
end
