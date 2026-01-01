import { useActionState } from "react";
import supabase from "../supabase-client.ts";
import type { FormProps } from "./types.ts";

function Form({ metrics }: FormProps) {
  const [error, submitAction, isPending] = useActionState(
    async (
      _previousState: Error | null,
      formData: FormData,
    ): Promise<Error | null> => {
      const newDeal = {
        name: formData.get("name") as string,
        sum: Number(formData.get("sum")),
      };
      if (isNaN(newDeal.sum)) throw new Error("!Please enter Number.");
      const { data, error } = await supabase.from("sales_deals").insert({
        name: newDeal.name,
        sum: newDeal.sum,
      });
      console.log(data);
      if (error) return new Error("!Unable to Update..");

      return null;
    },
    null,
  );

  const generateOptions = () => {
    return metrics.map((metric) => (
      <option key={metric.name} value={metric.name}>
        {metric.name}
      </option>
    ));
  };

  return (
    <div className="add-form-container">
      <form
        aria-label="Add new sales deal"
        aria-describedby="form-description"
        action={submitAction}
      >
        <div id="form-description" className="sr-only">
          Use this form to add a new sales deal. Select a sales rep and enter
          the amount.
        </div>

        <label htmlFor="deal-name">
          Name:
          <select
            id="deal-name"
            name="name"
            defaultValue={metrics?.[0]?.name || ""}
            aria-required="true"
            aria-invalid={!!error}
            disabled={isPending}
          >
            {generateOptions()}
          </select>
        </label>

        <label htmlFor="deal-value">
          Amount: $
          <input
            id="deal-value"
            type="number"
            name="value"
            defaultValue={0}
            className="amount-input"
            min="0"
            step="10"
            aria-required="true"
            aria-invalid={!!error}
            aria-label="Deal amount in dollars"
            disabled={isPending}
          />
        </label>

        <button type="submit" disabled={isPending} aria-busy={isPending}>
          {isPending ? `Adding deal....` : `Add Deal`}
          {/*'Adding deal' when pending*/}
        </button>
      </form>

      {/* Error message */}
    </div>
  );
}

export default Form;
