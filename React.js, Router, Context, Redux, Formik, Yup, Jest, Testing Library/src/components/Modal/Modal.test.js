import {render} from "@testing-library/react";
import Modal from "./Modal";

describe("Testing Modal Component", () => {
    test("To be in doc", () => {
        const {container} = render(<Modal text="Test Modal" />);

        const modal = container.querySelector('.modal-wrapper');

        expect(modal).toBeInTheDocument;
    });

    test("Check text", () => {
        const {container} = render(<Modal text="Test Modal" />);

        const text = container.querySelector('.modal-text').textContent;

        expect(text).toBe("Test Modal");
    });

    test("Make snapshot", () => {
        const modal = render(<Modal text="Test Modal" />);

        expect(modal).toMatchSnapshot();
    });
})
