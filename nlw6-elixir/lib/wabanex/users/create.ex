defmodule Wabanex.Users.Create do
  def call(params) do
    params
    |> Wabanex.User.changeset()
    |> Wabanex.Repo.insert()
  end
end
