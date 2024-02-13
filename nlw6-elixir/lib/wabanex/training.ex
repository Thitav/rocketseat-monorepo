defmodule Wabanex.Training do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id

  @fields [:user_id, :start_date, :end_date]

  schema "trainings" do
    belongs_to :user, Wabanex.User
    field :start_date, :date
    field :end_date, :date

    timestamps()

    has_many :exercises, Wabanex.Exercise
  end

  def changeset(params) do
    %__MODULE__{}
    |> cast(params, @fields)
    |> validate_required(@fields)
    |> unique_constraint([:email])
    |> cast_assoc(:exercises)
  end
end
