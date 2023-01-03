import {render} from "@testing-library/react";
import Button from "./Button";



describe("Button component", () => {
    test("Check button", () => {
        const {container} = render(<Button className="test-btn">Test Button</Button>);

        const btn = container.querySelector('.test-btn');
        expect(btn).toBeInTheDocument;
    });

    test("Check type", () => {
        const {container} = render(<Button className="test-btn">Test Button</Button>);

        const btn = container.querySelector('.test-btn').type;
        expect(btn).toBe('button');
    });

    test("Check value", () => {
        const {container} = render(<Button className="test-btn">Test Button</Button>);

        const btn = container.querySelector('.test-btn').textContent;
        expect(btn).toBe('Test Button');
    });

    test("Make snapshot", () => {
        const btn = render(<Button className="test-btn">Test Button</Button>);

        expect(btn).toMatchSnapshot();
    });
})
