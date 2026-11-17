import type { ComponentType, ReactNode } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Route as Questions } from "@/routes/find-your-roles";
import { Route as Results } from "@/routes/your-roles";
import { Route as Membership } from "@/routes/membership";
import { PILOT_REQUEST_HREF } from "@/lib/velq/invite";
import { clearFunnel } from "@/lib/velq/funnel-storage";

const { navigate } = vi.hoisted(() => ({ navigate: vi.fn() }));

vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...await importOriginal<typeof import("@tanstack/react-router")>(),
  useNavigate: () => navigate,
  Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  clearFunnel();
  sessionStorage.clear();
  navigate.mockClear();
});

it("completes the ten-question journey and offers a request, never a public claim route", () => {
  const Finder = Questions.options.component as ComponentType;
  const Ranked = Results.options.component as ComponentType;
  const Offer = Membership.options.component as ComponentType;
  const view = render(<Finder />);
  fireEvent.click(screen.getByRole("button", { name: /Next/ }));
  expect(screen.getByText("Choose an answer to continue.")).toBeVisible();
  for (let step = 0; step < 10; step++) {
    fireEvent.click(screen.getAllByRole("radio")[step % 5]!);
    fireEvent.click(screen.getByRole("button", { name: step < 9 ? /Next/ : /See my results/ }));
  }
  expect(navigate).toHaveBeenCalledWith({ to: "/your-roles" });
  view.rerender(<Ranked />);
  fireEvent.click(screen.getByRole("button", { name: "Choose my own roles" }));
  fireEvent.click(screen.getByRole("button", { name: /Investment banking Ranked/ }));
  fireEvent.click(screen.getByRole("button", { name: /Confirm shortlist/ }));
  expect(navigate).toHaveBeenCalledWith({ to: "/membership" });
  view.rerender(<Offer />);
  expect(screen.getByLabelText("Your shortlist code")).toHaveValue("VELQ1:ib");
  const request = screen.getByRole("link", { name: /Request a free pilot place/ });
  expect(request).toHaveAttribute("href", PILOT_REQUEST_HREF);
  expect(request.getAttribute("href")).toMatch(/^mailto:/);
  expect(request.getAttribute("href")).not.toContain("whop");
  expect(screen.getByText(/Sending an email does not approve access/)).toBeVisible();
  expect(screen.getByRole("button", { name: "Continue to Whop" })).toBeDisabled();
});
