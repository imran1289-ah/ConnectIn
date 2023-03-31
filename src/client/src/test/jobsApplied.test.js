sessionStorage.setItem("role", 'User');

//data-testid=
test("jobsApplied page randers properly", () =>{
  
  render(<UserSession>
      <BrowserRouter>
          <ViewJobsApplied/>
      </BrowserRouter>
  </UserSession>)
  const jobsAppliedDiv = screen.getByTestId("jobsApplied-test");
  expect(jobsAppliedDiv).toBeInTheDocument();
})
afterAll(() => {
  sessionStorage.removeItem('userID');
  sessionStorage.removeItem('firstName');
  sessionStorage.removeItem('lastName');
  sessionStorage.removeItem('role');
});