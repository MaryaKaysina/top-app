import Link from "next/link";
import { Title, Text } from "../components";
import { withLayout } from "../layout/Layout";

export function Error404() {
  return (
    <div className="notFoundBlock">
      <Title>404 - page not found</Title>
      <Text size='sm'>
        К сожалению, запрошенная Вами страница не существует или находиться в разработке...
      </Text>
      <Link href={`/`} legacyBehavior>На главную</Link>
    </div>
  );
}

export default withLayout(Error404);