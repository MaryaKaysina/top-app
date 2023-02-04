import Link from "next/link";
import { Title, Text, Button } from "../components";
import { withLayout } from "../layout/Layout";

function Error500() {
  return (
    <div className="serverFailBlock">
      <Title>Сервер временно не доступен</Title>
      <Text size='sm'>
        К сожалению, что-то пошло не так, мы исправим это в ближайшее время...
      </Text>
      <Link href={`/`} legacyBehavior>На главную</Link>
    </div>
  );
}

export default withLayout(Error500);