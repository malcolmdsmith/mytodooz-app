import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const items = await fetch(
		"https://my-recipes-13442.nodechef.com/api/todooz/user/all?owner_id=2&project_id=%5BMyTodooz%5D&completed=false"
	);

	return NextResponse.json(items);
}
